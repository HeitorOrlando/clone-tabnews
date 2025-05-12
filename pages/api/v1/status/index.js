import { version } from "react";
import database from "/infra/database";

async function statusPage(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionRows = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResults = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsRows =
    databaseMaxConnectionsResults.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_USER;

  const databaseCurrentConnectionsResults = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseCurrentConnectionsResultsRows =
    databaseCurrentConnectionsResults.rows[0].count;

  response.status(200).json({
    status_page: "Online",
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionRows,
        max_connections: databaseMaxConnectionsRows,
        current_connections: databaseCurrentConnectionsResultsRows,
      },
    },
  });
}

export default statusPage;

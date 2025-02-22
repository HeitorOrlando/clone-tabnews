import database from "../../../../infra/database";

async function statusPage(request, response) {
  const result = await database.query("SELECT 1 + 1 as SUM;");
  console.log(result.rows);
  response.status(200).json({ StatusPage: "Online" });
}

export default statusPage;

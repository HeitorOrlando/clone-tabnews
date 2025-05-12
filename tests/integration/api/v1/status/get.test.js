test("GET to ./api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responesBody = await response.json();
  expect(responesBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responesBody.updated_at).toISOString();
  expect(responesBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responesBody.dependencies.database.version).toEqual("16.0");

  expect(responesBody.dependencies.database.max_connections).toEqual("100");
  expect(responesBody.dependencies.database.current_connections).toEqual(1);
});

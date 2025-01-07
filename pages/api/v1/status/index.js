function statusPage(request, response) {
  response.status(200).json({ StatusPage: "Online" });
}

export default statusPage;

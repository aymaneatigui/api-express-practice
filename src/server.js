import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Express Work fine");
  res.status(200);
  res.json({ message: "this is data" });
});

export default app;

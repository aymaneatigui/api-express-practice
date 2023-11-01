import * as dotenv from "dotenv";
dotenv.config();

import app from "./src/server.js";

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server run on : http://localhost:${port}`);
});

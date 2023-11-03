import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import config from "./config";

const port = config.port;
app.listen(port, () => {
  console.log(`Server run on : http://localhost:${port}`);
});

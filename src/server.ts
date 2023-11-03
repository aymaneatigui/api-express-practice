import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/routes";
import { protect } from "./Modules/auth";
import { createUser, login } from "./Handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200);
  res.json({ message: "This is home" });
});

app.post("/signup", createUser);
app.post("/login", login);

app.use("/api", protect, router);

app.use((err, req, res, next)=>{
  if(err.type == "auth"){
    res.status(401)
    res.json({error: err.message})
  }else if(err.type == "inpute"){
    res.status(400).json({error : "Inpute Error"})
  }else{
    res.status(500).json({error : err.message})
  }
})

export default app;

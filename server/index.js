import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import appRoutes from "./routes/appRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
//enable us to send post req
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  cors({
    origin: "https://ideasloom-gggl.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
); //enables cross origin req
app.use(express.json());

app.use("/posts", appRoutes); //app routes
app.use("/user", userRoutes);

config(); //access to env
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

//connect database
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

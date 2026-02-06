import express from "express";
import type { Response, Request } from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";
import myUserRoute from "./routes/myUserRoute.js";
import myMenuRoute from "./routes/myMenuRoute.js";

mongoose.connect(process.env.DB_CONNECTION_STRING as string || "", {})
  .then(() => {
    console.log("Connected to database");})
  .catch((err) => {
    console.error("Error connecting to database:", err);});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/my/user", myUserRoute)
app.use("/api/my/menu", myMenuRoute)

app.get("/health", (req: Request, res: Response) => {
  res.send({message: "API is healthy"});
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

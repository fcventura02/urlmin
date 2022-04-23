import express from "express";
import cors from "cors";
import { URLController } from "./controller/URLController";
import { MongoConnection } from "./database/MongoConnection";

const api = express();
api.use(express.json());
api.use(cors());

const dataBase = new MongoConnection();
dataBase.connect();

const urlController = new URLController();
api.post("/", urlController.shorten);
api.get("/", urlController.listen);
api.get("/:hash", urlController.redirect);
api.delete("/:hash", urlController.delete);

api.listen(5000, () => console.log("Express listening"));

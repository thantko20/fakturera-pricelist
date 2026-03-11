import express from "express";
import translationService from "../services/translation.service";

const translationRoutes = express.Router();

translationRoutes.get("/en", async (req, res) => {
  return res.json(await translationService.getLocalePayload("en"));
});

export default translationRoutes;

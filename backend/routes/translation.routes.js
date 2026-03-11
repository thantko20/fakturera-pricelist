import express from "express";
import translationService from "../services/translation.service.js";

const translationRoutes = express.Router();

translationRoutes.get("/en", async (req, res) => {
  return res.json(await translationService.getLocalePayload("en"));
});

translationRoutes.get("/sv", async (req, res) => {
  return res.json(await translationService.getLocalePayload("sv"));
});

export default translationRoutes;

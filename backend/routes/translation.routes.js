import express from "express";
import translationService from "../services/translation.service.js";
import { LanguageNotSupportedError } from "../utils/error.js";

const translationRoutes = express.Router();

translationRoutes.get("/:lang", async (req, res) => {
  if (req.params.lang !== "en" && req.params.lang !== "sv") {
    throw new LanguageNotSupportedError();
  }
  res.setHeader("Cache-Control", "public, max-age=300");
  return res.json(await translationService.getLocalePayload(req.params.lang));
});

export default translationRoutes;

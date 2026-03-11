import { AppDataSource } from "../database/data-source.js";
import Translation from "../database/entities/Translation.entity.js";

const getLocalePayload = async (locale) => {
  const result = await AppDataSource.getRepository(Translation)
    .createQueryBuilder("t")
    .select("jsonb_object_agg(t.key_name, t.content)", "payload")
    .where("t.locale = :locale", { locale })
    .getRawOne();

  return result.payload;
};

const translationService = {
  getLocalePayload,
};

export default translationService;

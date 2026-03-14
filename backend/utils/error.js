import { logger } from "./logger.js";

class AppError extends Error {
  statusCode;
  tag;

  constructor(statusCode, message, tag) {
    super(message);
    this.statusCode = statusCode;
    this.tag = tag;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor() {
    super(400, "Validation Failed");
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(401, "Invalid Credentials", "InvalidCredentials");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(401, message || "Unauthenticated");
  }
}

export class InternalServerError extends AppError {
  constructor() {
    super(500, "Internal Server Error", "InternalServerError");
  }
}

export class LanguageNotSupportedError extends AppError {
  constructor() {
    super(400, "Language Not Supported", "LanguageNotSupported");
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(404, message || "Not Found", "NotFound");
  }
}

export class ProductNameAlreadyExistsError extends AppError {
  constructor(name) {
    super(409, `Product with name ${name} already exists`);
  }
}

export class ProductArticleNoAlreadyExistsError extends AppError {
  constructor(articleNo) {
    super(409, `Product with article no ${articleNo} already exists`);
  }
}

export const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      ok: false,
      data: null,
      error: {
        tag: error.tag,
        message: error.message,
      },
    });
  }
  logger.error(error, "Unknown error occurred");

  const err = new InternalServerError();
  return res.status(500).json({
    ok: false,
    data: null,
    error: {
      tag: err.tag,
      message: err.message,
    },
  });
};

import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  switch (err.name) {
    case "CastError":
      const castErrorMessage = `Resource not found. Invalid ${err.path}`;
      err = new ErrorHandler(400, castErrorMessage);
      break;
    case "JsonWebTokenError":
      const jwtErrorMessage = `Json web token is invalid`;
      err = new ErrorHandler(400, jwtErrorMessage);
      break;
    case "TokenExpiredError":
      const tokenExpireErrorMessage = `Json web token is expired`;
      err = new ErrorHandler(400, tokenExpireErrorMessage);
      break;
    case "MulterError":
      const multerErrorMessage = `File upload error: ${err.message}`;
      err = new ErrorHandler(400, multerErrorMessage);
      break;
    case "ValidationError":
      const validationErrorMessage = Object.values(err.errors).map((val) => val.message);
      err = new ErrorHandler(400, validationErrorMessage);
      break;
    case "AuthenticationError":
      const authenticationErrorMessage = `Authentication failed: ${err.message}`;
      err = new ErrorHandler(401, authenticationErrorMessage);
      break;
    case "AuthorizationError":
      const authorizationErrorMessage = `Authorization failed: ${err.message}`;
      err = new ErrorHandler(403, authorizationErrorMessage);
      break;
    case "NetworkError":
      const networkErrorMessage = `Network error: ${err.message}`;
      err = new ErrorHandler(500, networkErrorMessage);
      break;
    case "ThirdPartyAPIError":
      const thirdPartyAPIErrorMessage = `Third-party API error: ${err.message}`;
      err = new ErrorHandler(500, thirdPartyAPIErrorMessage);
      break;
    default:
      const unknownErrorMessage = `An unknown error occurred: ${err.message}`;
      err = new ErrorHandler(500, unknownErrorMessage);
      break;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;

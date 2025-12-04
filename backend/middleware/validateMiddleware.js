export const validateMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (err) {
      const status = 400;
      const message = "fill the input properly";
      const extraDetailsRaw =
        err?.issues?.[0]?.message || err?.message || "Validation failed";
      const extraDetails = extraDetailsRaw;
      const error = {
        status,
        message,
        extraDetails,
      };
      console.error(JSON.stringify(error));
      return next(error);
    }
  };
};

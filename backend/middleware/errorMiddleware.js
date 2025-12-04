export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server error";
  const extraDetails = err.extraDetails || "Backend Error";
  // const errors = Array.isArray(extraDetails) ? extraDetails : undefined;

  return res.status(status).json({ success: false, message, extraDetails });
};

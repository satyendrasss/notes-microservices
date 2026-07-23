// export default function errorMiddleware(err, req, res, next) {
//   console.error(err);

//   if (err.statusCode) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       errors: err.errors ?? null
//     });
//   }

//   return res.status(500).json({
//     success: false,
//     message: "Internal Server Error"
//   });
// }


import { ZodError } from "zod";

export default function errorMiddleware(err, req, res, next) {
  // console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues, // err.issues.map((issue) => issue.message), // use issues in newer Zod versions
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors ?? null,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
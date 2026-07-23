import { registerSchema } from "../utils/auth.validator.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  const data = registerSchema.parse(req.body);
  const user = await authService.register(data);

  res.status(201).json({
    success: true,
    data: user
  });
};

export const login = async (req, res) => {
  const token = await authService.login(req.body);

  res.json({
    success: true,
    data: token
  });
};


export async function getProfile(req, res) {
  const user = await authService.getProfile(req.user.id);
  return res.status(200).json({
    success: true,
    data: user
  });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const resss = await authService.forgotPassword(email);
  console.log("Forgot password response:", resss);
  return res.status(200).json({
    success: true,
    message: "If the email is registered, you will receive password reset instructions."
  });
}
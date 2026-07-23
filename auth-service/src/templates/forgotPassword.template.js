export const forgotPasswordTemplate = (resetUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
              <td align="center">

                  <table width="600" cellpadding="0" cellspacing="0"
                      style="background:#ffffff;border-radius:10px;padding:40px;">

                      <tr>
                          <td align="center">
                              <h1 style="margin:0;color:#2563eb;">
                                  Notes App
                              </h1>

                              <p style="color:#666;">
                                  Password Reset Request
                              </p>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding-top:25px;">

                              <p style="font-size:16px;color:#333;">
                                  Hello,
                              </p>

                              <p style="font-size:16px;color:#555;line-height:1.6;">
                                  We received a request to reset your password.
                                  Click the button below to create a new password.
                              </p>

                              <div style="text-align:center;margin:35px 0;">

                                  <a href="${resetUrl}"
                                      style="
                                          background:#2563eb;
                                          color:#ffffff;
                                          padding:14px 28px;
                                          border-radius:6px;
                                          text-decoration:none;
                                          font-weight:bold;
                                          display:inline-block;
                                      ">
                                      Reset Password
                                  </a>

                              </div>

                              <p style="color:#555;">
                                  This password reset link will expire in
                                  <strong>15 minutes</strong>.
                              </p>

                              <p style="color:#555;">
                                  If the button doesn't work, copy this link into your browser:
                              </p>

                              <p>
                                  <a href="${resetUrl}">
                                      ${resetUrl}
                                  </a>
                              </p>

                              <hr style="margin:30px 0;border:none;border-top:1px solid #eee;" />

                              <p style="font-size:14px;color:#777;">
                                  If you didn't request a password reset,
                                  you can safely ignore this email.
                              </p>

                          </td>
                      </tr>

                      <tr>
                          <td align="center">

                              <p style="margin-top:20px;color:#999;font-size:13px;">
                                  © ${new Date().getFullYear()} Notes App.
                                  All rights reserved.
                              </p>

                          </td>
                      </tr>

                  </table>

              </td>
          </tr>
      </table>

  </body>
  </html>
  `;
};
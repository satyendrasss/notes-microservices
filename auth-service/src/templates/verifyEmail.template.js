export const verifyEmailTemplate = (verifyUrl) => `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif">

<h2>Verify Your Email</h2>

<p>
Please verify your email address by clicking the button below.
</p>

<p>
<a
href="${verifyUrl}"
style="
background:#2563eb;
color:white;
padding:12px 24px;
text-decoration:none;
border-radius:6px;
">
Verify Email
</a>
</p>

</body>
</html>
`;
export const verify_email_tamplate = (url: string, user?: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #007bff;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Hello ${user || "User"},</p>
      <p>Thank you for signing up! Please click the button below to verify your email address and activate your account.</p>
      <div class="button-container">
        <a href=${url} class="button">Verify Email</a>
      </div>
      <p>If you did not sign up for this account, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};

export const verify_password_reset_template = (url: string, user?: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #dc3545;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #dc3545;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
    }
    .button:hover {
      background-color: #c82333;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello ${user || "User"},</p>
      <p>We received a request to reset your password. Click the button below to reset your password:</p>
      <div class="button-container">
        <a href='${url}' class="button">Reset Password</a>
      </div>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};

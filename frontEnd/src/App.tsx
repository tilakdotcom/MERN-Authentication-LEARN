import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordLinkPage from "./pages/ResetPasswordLinkPage";
import VerifyAndPasswordPage from "./pages/VerifyAndPasswordPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return <>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="email-verify/:code" element={<VerifyEmailPage />} />
      <Route path="reset-password-link" element={<ResetPasswordLinkPage />} />
      <Route path="verify-and-password/:token" element={<VerifyAndPasswordPage />} />
    </Route>
  </Routes>
  </>;
}
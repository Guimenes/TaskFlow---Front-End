// src/middlewares/AuthMiddleware.tsx
import { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
{
  /* import { DeleteToken, GetTokenAndVerify } from "../../utils/auth/auth"; */
}
import Loading from "../../components/loading/load";
import ApiProvider from "../../utils/provider/providerUtils";
import { authUtils } from "../../utils/auth/authUtils";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // forçando o login use true

  useEffect(() => {
    const verify = async () => {
      const token = authUtils.getToken();
      const response = await new ApiProvider("/verify-token").postOne(token) as any
      setIsVerified(response)
    };
    verify();
  }, []);

  if (isVerified === null) return <Loading />;

  if (location.pathname.startsWith("/system") && !isVerified) {
    authUtils.removeToken();
    return <Navigate to="/" replace />;
  }

  if (!location.pathname.startsWith("/system") && isVerified) {
    return <Navigate to="/system" replace />;
  }

  return children;
};

export default AuthMiddleware;

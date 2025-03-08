// src/middlewares/AuthMiddleware.tsx
import { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
{
  /* import { DeleteToken, GetTokenAndVerify } from "../../utils/auth/auth"; */
}
import Loading from "../../components/loading/load";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(true); // forçando o login use true

  useEffect(() => {
    const verify = async () => {
      {
        /* const user = await GetTokenAndVerify();
      setIsVerified(!!user); */
      }
    };
    verify();
  }, [location]);

  if (isVerified === null) return <Loading />;

  if (location.pathname.startsWith("/system") && !isVerified) {
    {
      /* DeleteToken(); */
    }
    return <Navigate to="/" replace />;
  }

  if (!location.pathname.startsWith("/system") && isVerified) {
    return <Navigate to="/system" replace />;
  }

  return children;
};

export default AuthMiddleware;

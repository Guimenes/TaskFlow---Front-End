// src/middlewares/AuthMiddleware.tsx
import { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../../components/loading/load";
import ApiProvider from "../../utils/provider/providerUtils";
import { authUtils } from "../../utils/auth/authUtils";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); 

  const verify = async () => {
    const token = authUtils.getToken();
    try {
      const response = (await new ApiProvider("/verify-token").postOne(token)) as any;
      if (response) {
        setIsVerified(response); // Sucesso, atualiza o estado
      } else {
        setIsVerified(true); // Sem resposta, considera não verificado
      }
    } catch (error) {
      setIsVerified(true); // Falha na verificação, considera não verificado
    }
  };

  // UseEffect para fazer a verificação assim que o componente for montado ou quando a localização mudar
  useEffect(() => {
    if (isVerified === null) {
      verify(); // Se ainda não verificamos, executa a verificação
    }
  }, [location, isVerified]);

  // Caso o estado de verificação ainda não esteja determinado, exibe o loading
  if (isVerified === null) {
    return <Loading />;
  }

  // Se o token não for verificado, redireciona para a página inicial
  if (location.pathname.startsWith("/system") && !isVerified) {
    authUtils.removeToken();
    return <Navigate to="/" replace />;
  }

  // Se estiver verificado e tentando acessar uma página fora do /system, redireciona para /system
  if (!location.pathname.startsWith("/system") && isVerified) {
    return <Navigate to="/system" replace />;
  }

  // Se o usuário está autorizado e na página correta, renderiza o conteúdo filho
  return children;
};

export default AuthMiddleware;

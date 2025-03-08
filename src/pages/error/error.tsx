import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Usando useNavigate para React Router v6
import Root from "../../components/Root/root";
import ErrorIcon from "@mui/icons-material/Error"; // Ícone de erro do Material UI
import { colors } from "../../assets/colors";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5); // Contador começa em 5 segundos

  useEffect(() => {
    if (counter === 0) {
      navigate(-1); // Redireciona para a última página
    }

    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, [counter, navigate]);

  return (
    <Root direction="column">
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: colors.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ErrorIcon style={{ fontSize: 60, color: "red", fontWeight: "bold" }} />
        <h1>Error</h1>
        <p>Something went wrong. You will be redirected in {counter} seconds...</p>
      </div>
    </Root>
  );
};

export default ErrorPage;

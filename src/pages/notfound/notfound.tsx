import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Usando useNavigate para React Router v6
import Root from "../../components/Root/root";
import { colors } from "../../assets/colors";

const NotFound = () => {
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
        style={{ textAlign: "center", padding: "20px", color: colors.white, fontWeight: "bold" }}
      >
        <h1>404 - Not Found Page</h1>
        <p>You will be redirected in {counter} seconds...</p>
      </div>
    </Root>
  );
};

export default NotFound;

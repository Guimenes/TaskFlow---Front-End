import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Nav/Navbar";
import Root from "../../../components/Root/root";

const SystemBoard = () => {
  // PEGAR BOARD USANDO O PARAMETRO DE ROTA E TRAZER DADOS DO BACK
  return (
    <>
      <Navbar></Navbar>
      <Root direction={"column"}>
        <></>
      </Root>
      <Footer></Footer>
    </>
  );
};

export default SystemBoard;

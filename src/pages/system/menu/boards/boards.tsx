import { useNavigate } from "react-router";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Nav/Navbar";
import Root from "../../../../components/Root/root";
import { useEffect, useState } from "react";
import ApiProvider from "../../../../utils/provider/providerUtils";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { colors } from "../../../../assets/colors";
import {
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";
import { storageUtils } from "../../../../utils/localstorage/storageUtils";

const SystemBoards = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<any>([]);
  const [workspaces, setWorkspaces] = useState<any>([]);
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWorkspace = (id: string) => {
    setExpandedWorkspaces((prev) => ({
      ...prev,
      [id]: !prev[id], // Inverte o estado apenas do workspace específico
    }));
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const fakeBoards = [
        { id: 1, name: "Mapas de Trânsito", workspace: 1 },
        { id: 2, name: "Exercícios de Física", workspace: 1 },
        { id: 3, name: "Teoria de Cálculo", workspace: 1 },
        { id: 4, name: "Provas de Análise", workspace: 1 },
        { id: 5, name: "Projetos de Programação", workspace: 1 },
        { id: 6, name: "Provas de Análise", workspace: 1 },
        { id: 7, name: "Projetos de Programação", workspace: 1 },
        { id: 8, name: "Provas de Análise", workspace: 1 },
        { id: 9, name: "Projetos de Programação", workspace: 1 },

        { id: 6, name: "Planejamento de Tarefas", workspace: 2 },
        { id: 7, name: "Fórmula da Física", workspace: 2 },
        { id: 8, name: "Cálculo I", workspace: 3 },
        { id: 9, name: "Cálculo II", workspace: 3 },

        { id: 10, name: "Revisão de Provas", workspace: 4 },
        { id: 11, name: "Novo Projeto", workspace: 5 },
        { id: 12, name: "Estudo de Algoritmos", workspace: 5 },
      ];

      try {
        const responseBoards = (await new ApiProvider(
          "/get-boards"
        ).getMany()) as any;

        if (responseBoards.status == 200) return setBoards(responseBoards);
        if (responseBoards.status !== 200) return setBoards(fakeBoards);
      } catch (error) {
        setBoards(fakeBoards);
      }
    };

    const fetchWorkspaces = async () => {
      const fakeWorkspaces = [
        { id: 1, name: "My Workspace" },
        { id: 2, name: "My Workspace 2" },
        { id: 3, name: "My Workspace 3" },
        { id: 4, name: "My Workspace 4" },
        { id: 5, name: "My Workspace 5" },
      ];

      try {
        const responseWorkspaces = (await new ApiProvider(
          "/get-workspaces"
        ).getMany()) as any;

        const responseWorkspacesAcessos = (await new ApiProvider(
          "/get-workspaces-acessos"
        ).getMany()) as any;

        const mergedWorkspaces: string | any[] = [
          //...responseWorkspaces,
          //...responseWorkspacesAcessos,
        ];

        if (mergedWorkspaces.length > 0) return setWorkspaces(mergedWorkspaces);
        if (mergedWorkspaces.length == 0) return setWorkspaces(fakeWorkspaces);
      } catch (error) {
        setWorkspaces(fakeWorkspaces);
      }
    };

    fetchBoards();
    fetchWorkspaces();
  }, []);

  return (
    <>
      <Navbar />
      <Root direction={"column"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap", // Adiciona o wrap para permitir a quebra de linha
            height: "100%",
            width: "90vw",
            gap: 5,
            mt: 3,
          }}
        >
          {workspaces.length > 0 && boards.length > 0 ? (
            workspaces.map((workspace: any) => (
              <Box
                key={workspace.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "90vw",
                  gap: 5,
                  paddingBottom: 6,
                  paddingTop: 6,
                  paddingRight: 2,
                  paddingLeft: 2,
                  background: colors.bg,
                  borderRadius: 2,
                  boxShadow: "0px 5px 20px 2px rgb(80, 80, 80)",
                }}
              >
                {/* Exibe o título do Workspace */}
                <Container
                  sx={{
                    height: "100%",
                    width: "100%",
                    paddingBottom: 1,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "70%",
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: 26,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      {workspace.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        borderRadius: "20px",
                        width: "100%",
                        background: colors.bg,
                      }}
                      onClick={() => {
                        storageUtils.setItem("mainWorkspace", workspace.id);
                        navigate("/system");
                      }}
                    >
                      Open Workspace
                    </Button>
                    <IconButton
                      onClick={() => toggleWorkspace(workspace.id)}
                      sx={{
                        boxShadow: "0px 0px 100px 1px rgb(221, 221, 221)",
                        width: "auto",
                        height: "100%",
                      }}
                    >
                      {expandedWorkspaces[workspace.id] ? (
                        <ArrowUpwardOutlined
                          sx={{
                            color: colors.white,
                            fontSize: "30px",
                            textAlign: "center",
                          }}
                        />
                      ) : (
                        <ArrowDownwardOutlined
                          sx={{
                            color: colors.white,
                            fontSize: "30px",
                            textAlign: "center",
                          }}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Container>

                {/* Exibe os Boards relacionados ao Workspace */}
                {expandedWorkspaces[workspace.id] && (
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      height: "100%",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    {boards
                      .filter((board: any) => board.workspace === workspace.id)
                      .map((board: any) => (
                        <Card
                          key={board.id}
                          data-index={board.id}
                          sx={{
                            padding: "10px",
                            marginRight: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            height: "15vh",
                            width: "15vw",
                            boxSizing: "border-box",
                            boxShadow: "0px 5px 20px 2px rgb(80, 80, 80)",
                          }}
                          onClick={() => {
                            navigate(`/system/board/${board.id}`);
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{ fontSize: 16, color: colors.pink }}
                          >
                            {board.name}
                          </Typography>
                        </Card>
                      ))}
                  </Container>
                )}
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "90vw",
                gap: 5,
                paddingBottom: 6,
                paddingTop: 6,
                paddingRight: 2,
                paddingLeft: 2,
                background: colors.bg,
                borderRadius: 2,
                boxShadow: "0px 5px 20px 2px rgb(80, 80, 80)",
              }}
            >
              <Skeleton
                sx={{
                  height: "25vh",
                  width: "100%",
                  paddingBottom: 1,
                }}
              />

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap", // Adiciona o wrap para permitir a quebra de linha
                  height: "100%",
                  width: "100%",
                  gap: 2,
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index} // Sempre adicione uma key única ao map
                    sx={{
                      padding: "10px",
                      marginRight: "10px", // Adiciona margem para espaçar os cards
                      borderRadius: "8px",
                      height: "25vh",
                      width: "15vw", // Define a largura fixa dos cards
                      boxSizing: "border-box", // Certifica-se de que padding e borda não afetam o tamanho do card
                    }}
                  />
                ))}
              </Container>
            </Box>
          )}
        </Box>
      </Root>
      <Footer />
    </>
  );
};

export default SystemBoards;

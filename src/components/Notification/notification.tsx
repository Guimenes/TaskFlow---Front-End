import {
  Close,
  NotificationsActive,
  NotificationsNone,
} from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ApiProvider from "../../utils/provider/providerUtils";

// Ajustando para usar props
const NotificationBox = ({ onClick }: { onClick: () => void }) => {
  const [notifications, setNotifications] = useState([{}]);

  const MotionBox = motion(Box);

  const fakeNotf = [
    { text: "Novo cartão criado na lista 'A Fazer'.", status: true },
    {
      text: "Você foi atribuído a uma tarefa na lista 'Em Progresso'.",
      status: true,
    },
    {
      text: "Comentário adicionado à sua tarefa 'Revisar relatório'.",
      status: true,
    },
    {
      text: "A tarefa 'Preparar apresentação' foi movida para a lista 'Concluído'.",
      status: true,
    },
    {
      text: "Novo membro foi adicionado à sua equipe de trabalho.",
      status: true,
    },
    {
      text: "O prazo da tarefa 'Enviar e-mail' foi alterado para amanhã.",
      status: true,
    },
    {
      text: "Sua tarefa 'Revisar contrato' foi reaberta para ajustes.",
      status: true,
    },
    {
      text: "A tarefa 'Reunião com cliente' foi movida para a lista 'Em Espera'.",
      status: false,
    },
    {
      text: "Você não foi mais atribuído à tarefa 'Ajustar orçamento'.",
      status: false,
    },
    {
      text: "A tarefa 'Revisar código' foi movida para a lista 'Pendente'.",
      status: false,
    },
    {
      text: "O membro 'João' foi removido da tarefa 'Criar protótipo'.",
      status: false,
    },
    { text: "A tarefa 'Documentar mudanças' foi cancelada.", status: false },
    {
      text: "A lista 'Urgente' foi renomeada para 'Prioritário'.",
      status: false,
    },
  ];

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = (await new ApiProvider(
          "/notifications"
        ).getMany()) as any;
        if (response.status == 200) return setNotifications(response);
        if (response.status !== 200) return setNotifications(fakeNotf);
      } catch (error) {
        setNotifications(fakeNotf);
      }
    };

    getNotifications();
  }, []);

  const markAsRead = async () => {
    try {
      await new ApiProvider("/mark-as-read").postOne();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MotionBox
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      sx={{
        background: "white",
        width: "20vw",
        height: "60vh",
        borderRadius: 5,
        mt: 40,
        overflow: "auto",
        transformOrigin: "top", // Garante que a animação comece do topo
      }}
    >
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          color: "black",
          gap: 1,
          paddingLeft: 2,
          paddingTop: 2,
        }}
      >
        <Close sx={{ color: "red" }} />
        <Typography variant="body2" sx={{ color: "red", fontWeight: "bold" }}>
          Close Notifications
        </Typography>
      </IconButton>
      <Divider sx={{ margin: 2, marginTop: 0, marginBottom: 0 }} />
      <IconButton
        color="inherit"
        onClick={() => {
          markAsRead();
        }}
        sx={{
          color: "black",
          gap: 1,
          paddingLeft: 2,
        }}
      >
        <NotificationsNone sx={{ color: "black" }} />
        <Typography variant="body2" sx={{ color: "black", fontWeight: "bold" }}>
          Mark as Read
        </Typography>
      </IconButton>
      <Divider sx={{ margin: 2, marginTop: 0, marginBottom: 0 }} />
      <Box sx={{ padding: 1 }}>
        {notifications.map((item: any, index: any) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              padding: 2,
              mt: 1,
              mb: 1,
              opacity: item.status ? 1 : 0.3,
              color: !item.status ? "rgba(44, 44, 44, 0.2)" : "",
              boxShadow: "0 0 10px 1px rgba(44, 44, 44, 0.2)",
              cursor: "pointer",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 0 10px 1px rgba(44, 44, 44, 0.7)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "black",
                width: item.status ? "85%" : "100%",
                paddingRight: 3,
              }}
            >
              {item.text}
            </Typography>
            {item.status && <NotificationsActive sx={{ width: "10%" }} />}
          </Card>
        ))}
      </Box>
    </MotionBox>
  );
};

export default NotificationBox;

import ApiProvider from "../../utils/provider/providerUtils";

export const fakeNotf = [
  { text: "Novo cartão criado na lista 'A Fazer'.", status: true },
  { text: "Você foi atribuído a uma tarefa na lista 'Em Progresso'.", status: true },
  { text: "Comentário adicionado à sua tarefa 'Revisar relatório'.", status: true },
  { text: "A tarefa 'Preparar apresentação' foi movida para a lista 'Concluído'.", status: true },
  { text: "Novo membro foi adicionado à sua equipe de trabalho.", status: true },
  { text: "O prazo da tarefa 'Enviar e-mail' foi alterado para amanhã.", status: true },
  { text: "Sua tarefa 'Revisar contrato' foi reaberta para ajustes.", status: true },
  { text: "A tarefa 'Reunião com cliente' foi movida para a lista 'Em Espera'.", status: false },
  { text: "Você não foi mais atribuído à tarefa 'Ajustar orçamento'.", status: false },
  { text: "A tarefa 'Revisar código' foi movida para a lista 'Pendente'.", status: false },
  { text: "O membro 'João' foi removido da tarefa 'Criar protótipo'.", status: false },
  { text: "A tarefa 'Documentar mudanças' foi cancelada.", status: false },
  { text: "A lista 'Urgente' foi renomeada para 'Prioritário'.", status: false },
];

export const getNotifications = async () => {
  try {
    const response = (await new ApiProvider("/notifications").getMany()) as any;
    return response.status === 200 ? response : fakeNotf;
  } catch (error) {
    return fakeNotf;
  }
};

export const markAsRead = async () => {
  try {
    await new ApiProvider("/mark-as-read").postOne();
  } catch (error) {
    console.error("Erro ao marcar notificações como lidas:", error);
  }
};

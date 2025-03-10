import {
  Close,
  NotificationsActive,
  NotificationsNone,
} from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ApiProvider from "../../utils/provider/providerUtils";
import styles from "./Notification.module.css";
import { getNotifications, markAsRead, fakeNotf } from "./notificationService.ts";

const NotificationBox = ({ onClick }: { onClick: () => void }) => {
  const [notifications, setNotifications] = useState(fakeNotf);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }} // Começa menor e levemente abaixo
    animate={{ opacity: 1, scale: 1, y: 0 }} // Cresce suavemente e sobe para posição final
    exit={{ opacity: 0, scale: 0.9, y: 10 }} // Sai reduzindo de tamanho e descendo um pouco
    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }} // Animação suave e moderna
    className={styles.notificationContainer}
    >
      <div className={styles.notificationHeader}>
        <IconButton onClick={markAsRead} className={styles.markAsReadButton}>
          <NotificationsNone className={styles.markAsReadIcon} />
          <Typography variant="body2" className={styles.markAsReadText}>
            Marcar como Lido
          </Typography>
        </IconButton>

        <IconButton onClick={onClick} className={styles.closeButton}>
          <Close className={styles.closeIcon} />
        </IconButton>
      </div>

      <Divider className={styles.divider} />

      <Box className={styles.notificationList}>
        {notifications.map((item, index) => (
          <Card key={index} className={`${styles.notificationItem} ${item.status ? styles.active : styles.inactive}`}>
            <Typography variant="body2" className={styles.notificationText}>
              {item.text}
            </Typography>
            {item.status && <NotificationsActive className={styles.notificationIcon} />}
          </Card>
        ))}
      </Box>
    </motion.div>
  );
};

export default NotificationBox;

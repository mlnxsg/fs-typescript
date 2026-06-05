import { Alert } from "@mui/material";

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  if (!message) return null;

  return <Alert severity="error">{message}</Alert>;
};

export default Notification;
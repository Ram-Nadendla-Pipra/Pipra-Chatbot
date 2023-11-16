import React from "react";
import "./ChatBot.scss";
import ChatDailog from '../components/ChatDailog/ChatDailog.tsx';
import { Button } from "@mui/material";
export const ChatBot = (props:any) => {
  const [open, setOpen] = React.useState(false);

  const chatDlgClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Start Chat</Button>
      <ChatDailog open={open} onClose={chatDlgClose} />
    </div>
  );
};
export default ChatBot;

import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { Button, Typography } from "@mui/material";
import "./ChatWidgetToolbar.scss";
import { setChatMessagesData } from "../../store/chatbotSlice";

const ChatWidgetToolbar = (props: any) => {
  const dispatch = useAppDispatch();
  const onChatClearClick = (e: any)=> {
      dispatch(setChatMessagesData([]));
  };

  return (
    <div className="chat-widget-toolbar">
    <Typography className="chat-widget-toolbar_welcomeText">Welcome to chat bot</Typography>
        <Button variant="text" onClick={(e: any) => onChatClearClick(e)}>
          Clear Chat
        </Button>
    </div>
  );
};
export default ChatWidgetToolbar;

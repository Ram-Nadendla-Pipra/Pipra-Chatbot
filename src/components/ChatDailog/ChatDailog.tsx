import React, { useRef, useState } from "react";
import "./ChatDailog.scss";
import Dialog from "@mui/material/Dialog";
import SUIChatWidget from "../ChatWidget/ChatWidget";
export interface ChatWidgetDlgProps {
  open: boolean;
  onClose: (value: string) => void;
}

export const ChatDialog = (props: ChatWidgetDlgProps) => {
  const { onClose, open } = props;
  const [dlgPosition] = useState({
    right: "0px",
    bottom: "0px",
  });
  const dlgRef: any = useRef();

  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
    onClose("");
  };
  return (
    <Dialog
      ref={dlgRef}
      onClose={handleClose}
      open={open}
      className={`chat-widget-dlg`}
      PaperProps={{
        sx: {
          position: "fixed",
          right: dlgPosition.right,
          bottom: dlgPosition.bottom,
        },
      }}
    >
      <div className="chat-dlg-container">
        <SUIChatWidget
          collapseWdgt={() => {
            
          }}
          onClose={handleClose}
        ></SUIChatWidget>
      </div>
    </Dialog>
  );
};
export default ChatDialog;

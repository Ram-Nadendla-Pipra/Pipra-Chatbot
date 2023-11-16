import { useRef, useEffect } from "react";
import "./ChatWidget.scss";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import ChatSection from "../ChatSection/ChatSection";
import ChatWidgetFooter from "../ChatWidgetFooter/ChatWidgetFooter";
import ChatWidgetToolbar from "../ChatWidgetToolbar/ChatWidgetToolbar";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import UnfoldLessTwoToneIcon from "@mui/icons-material/UnfoldLessTwoTone";
export interface ChatWidgetDlgProps {
  onClose?: any;
  collapseWdgt?: any;
  chatData?: any;
}

export const ChatWidget = (props: ChatWidgetDlgProps) => {
  const { onClose, collapseWdgt } = props;
  const chatMeassgesData = useAppSelector(
    (state: any) => state.chatbot.chatMessagesData
  );
  const scrollBodyRef = useRef<any>();

  const collpaseWidget = () => {
    collapseWdgt();
  };

  const closeChatBot = () => {
    onClose();
  };

  useEffect(() => {
    if (scrollBodyRef?.current) {

      scrollBodyRef?.current?.addEventListener(
        "DOMNodeInserted",
        (event: any) => {
          const { currentTarget: target } = event;
            target.scroll({
              top: target.scrollHeight + 50,
              behavior: "smooth",
            });
        }
      );
      if (scrollBodyRef?.current?.scrollHeight) {
          scrollBodyRef?.current.scroll({
            top: scrollBodyRef?.current.scrollHeight + 50,
            behavior: "smooth",
          });
      }
    }
  }, [chatMeassgesData]);

  return (
    <div className="chat-widget-container">
      <Card className={"close-widget-card"}>
        <CardHeader
          action={
            <>
              <IconButton
                className="header-minimize"
                aria-label="expand"
                onClick={collpaseWidget}
              >
                <UnfoldLessTwoToneIcon />
              </IconButton>
              <IconButton
                className="header-close"
                aria-label="close"
                onClick={closeChatBot}
              >
                <HighlightOffRoundedIcon />
              </IconButton>
            </>
          }
        />
        <div className="chat-widget-container_title-img-wrapper">
          <img
            draggable={false}
            src={
              "https://assets-global.website-files.com/6211d2ca98b53646eb75d497/64ddac5eb83c59b66cbcb024_logo-with-text.png"
            }
            alt="Pipra"
            className={"chat-widget-container_title-img"}
          />
        </div>

        <ChatWidgetToolbar></ChatWidgetToolbar>

        <CardContent>
          <div className="chat-widget-container_body" ref={scrollBodyRef}>
            <ChatSection />
          </div>
        </CardContent>
        <ChatWidgetFooter></ChatWidgetFooter>
      </Card>
    </div>
  );
};

export default ChatWidget;

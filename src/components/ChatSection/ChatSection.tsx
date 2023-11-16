import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import "./ChatSection.scss";
import { setChatMessagesData } from "../../store/chatbotSlice";

const ChatSection = (props: any) => {
  const data = [
    {
      contentType: "image",
      text: "Hello",
      content:
        "https://assets-global.website-files.com/6211d2ca98b53646eb75d497/64ddac5eb83c59b66cbcb024_logo-with-text.png",
      isReply: true,
    },
    {
      contentType: "html",
      text: "Hi Bot",
      isReply: true,
      content:
        "<table><tr><th>Name</th><th>Address</th></tr><tr><td>Bot</td><td>Hyd</td></tr></table>",
    },
    {
      contentType: "text",
      content: "I'm sorry, I didn't quite catch that. Can you please rephrase?",
      isReply: true,
    },
  ];
  const { chatMessagesData, lastTyped, audioUrl } = useAppSelector(
    (state: any) => state.chatbot
  );
  const dispatch = useAppDispatch();
  const CreateChatData = (lastTyped: any) => {
    return {
      contentType: "text",
      text: lastTyped,
      content: lastTyped,
    };
  };
  useEffect(() => {
    let updatedChatItems: any = [];
    if (lastTyped) {
      const lastTypedData = CreateChatData(lastTyped);
      let filterData: any = data.filter((x: any) => x.text === lastTyped);
      filterData =
        filterData.length === 0 ? [data[data.length - 1]] : filterData;
      updatedChatItems = [...chatMessagesData, lastTypedData, ...filterData];
    }
    dispatch(setChatMessagesData(updatedChatItems.flat()));
  }, [lastTyped]);
  useEffect(() => {
    let updatedChatItems: any = [];
    if (audioUrl !== "") {
      const lastTypedData = {
        contentType: "audio",
        text: audioUrl,
        content: audioUrl,
      };
      updatedChatItems = [...chatMessagesData, lastTypedData];
    }
    dispatch(setChatMessagesData(updatedChatItems.flat()));
  }, [audioUrl]);
  return (
    <div className="chat-section">
      {chatMessagesData.map((rec: any, index: any) => {
        return (
          <>
            {rec.contentType === "image" && (
              <img
                draggable={false}
                src={rec.content}
                alt="Pipra"
                className={"chat-section_reply-img"}
              />
            )}
            {rec.contentType === "audio" ? (
              <audio src={rec.content} controls></audio>
            ) : (
              <>
                {rec.contentType === "image" ? null : (
                  <div key={index} className="chat-section_item-wrapper">
                    <div
                      className={
                        "chat-section_item " +
                        (rec.isReply ? " is-reply " : " is-selection ") +
                        (rec.isWaiting ? " is-waiting " : "") +
                        (rec.suggest?.length ? "chat-history-thread" : "")
                      }
                      tabIndex={0}
                      dangerouslySetInnerHTML={{ __html: rec.content || "" }}
                    ></div>
                  </div>
                )}
              </>
            )}
          </>
        );
      })}
    </div>
  );
};
export default ChatSection;

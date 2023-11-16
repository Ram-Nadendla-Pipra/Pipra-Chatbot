import React, { useEffect, useState, useRef } from "react";
import {  useAppDispatch } from "../../store/hooks";
import {  setAudioUrl, updateLastTyped } from "../../store/chatbotSlice";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import "./ChatWidgetFooter.scss";
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import { useReactMediaRecorder } from "react-media-recorder";
const ChatWidgetFooter = (props: any) => {
  const [isActive, setIsActive] = useState(false);
  const [typedVal, setTypedVal] = useState<any>("");
  const textFieldRef = useRef<any>('');
  const textRef = useRef('');

  const dispatch = useAppDispatch();

  const onTextChange = (e: any) => {
    setTypedVal(e.target.value);
    textRef.current = e.target.value;
  };

  const onSendMessage = (val: any) => {
    if (val?.replace(/\n/g, "")) {
      dispatch(updateLastTyped(val));
    }
    setTypedVal("");
    textRef.current = '';
  };

  const {status,startRecording,stopRecording,pauseRecording,mediaBlobUrl} = useReactMediaRecorder({audio: true});
  const onVoiceSearch = () => {
    if (!isActive) {
      startRecording();
    } else {
      stopRecording();
    }

    setIsActive(!isActive);
  };
  useEffect(() => {
      if(mediaBlobUrl ?? false) {
          dispatch(setAudioUrl(mediaBlobUrl))
      };
  },[mediaBlobUrl]);
  return (
    <div
      className={
        "chat-widget-footer " +
        (typedVal?.length > 0
          ? "chat-widget-footer_focused"
          : "")
      }
    >
      <div className="chat-widget-footer-text-voice-wrapper">
         {/* {status !== 'recording' &&  */}
         <TextField
          autoFocus
          className="chat-widget-footer-text-box"
          ref={textFieldRef}
          placeholder={"Type your message"}
          value={typedVal}
          inputRef={(input) => input && input.focus()}
          onChange={(e: any) => onTextChange(e)}
          onKeyDown={(e: any) => {
            if (e.keyCode === 13 && e.target.value?.length > 0) {
              onSendMessage(e.target.value);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className="send-btn-cls"
                  edge="end"
                  onClick={() => {
                    onSendMessage(typedVal);
                  }}
                >
                  <SendIcon></SendIcon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
       {/* } */}
       
        <div
          tabIndex={0}
          className={
            "chat-widget-footer-voice-btn " + ("active")
          }
          onClick={onVoiceSearch}
        >
          {status !== 'recording' && <MicTwoToneIcon style={{cursor : 'pointer'}} />}
          {status === 'recording' && (
            <img alt="voice"
              className="voicebtn-listen-cls"
              style={{cursor : 'pointer'}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidgetFooter;
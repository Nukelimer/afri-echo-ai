"use client";

import Messages from "@/components/Messages";
import Recorder, { recordingType } from "@/components/Recorder";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import transcript from "@/actions/transcript";
import VoiceSynthesiser from "@/components/VoiceSynthesiser";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export type Message = {
  sender: string;
  response: string;
  id: string;
};

function AfriEchoAI() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useFormState(transcript, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displaySettings, setDisplaySettings] = useState<boolean>(false)

  const [recordingStatus, setRecordingStatus] = useState<string>("inactive");

  useEffect(() => {
    if (state.response && state.response) {
      setMessages((message) => {
        return [
          ...message,
          {
            sender: state.sender || "",
            id: state.id || "",
            response: state?.response || "",
          },
        ];
      });
    }
  }, [state]);

  function uploadAudio(blob: Blob) {
    const file = new File([blob], recordingType, { type: recordingType });

    if (fileRef?.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;
    }

    if (buttonRef?.current) {
      buttonRef.current.click();
    }
  }

  console.log(messages);

  return (
    <section className="bg-black h-screen overflow-auto">
      <header className="flex justify-between   w-full fixed p-6 ">
        <Image
          src={
            recordingStatus === "recording"
              ? "/images/avatar-talking.png"
              : "/images/avatar-not-talking.png"
          }
          alt="avatar"
          width={40}
          height={40}
          className={`object-contain bg-slate-500 rounded-full hover:bg-slate-200 ${
            recordingStatus === 'recording' ? 'animate-pulse transition-all ease-in-out duration-500' : ''
          } transition-all ease-in-out duration-200`}
        />

        <SettingsIcon
          size={40}
          color="#1E293B"
          className="bg-slate-500 rounded-full cursor-pointer hover:bg-slate-200 hover:animate-pulse transition-all ease-in-out duration-200"

          onClick={()=>setDisplaySettings(!displaySettings)}
        />
      </header>

      <form action={formAction} className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-slate-400 to-slate-200 dark:bg-gradient-to-t dark:from-cyan-200 dark:to-slate-950">
          <Messages messages={ messages} />
        </div>

        <input type="file" name="audio" id="" hidden ref={fileRef} />
        <button type="submit" hidden ref={buttonRef} />

        <div className=" fixed bottom-0 w-full overflow-hidden bg-secondary rounded-t-3xl r">
          <Recorder
            uploadAudio={uploadAudio}
            recordingStatus={recordingStatus}
            setRecordingStatus={setRecordingStatus}
          />
        <div className="">

          <VoiceSynthesiser state={ state} displaySettings={displaySettings} />
          
        </div>
        </div>
      </form>
    </section>
  );
}

export default AfriEchoAI;

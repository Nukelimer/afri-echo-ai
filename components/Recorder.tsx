"use client";

import Image from "next/image";
import activeRecorder from "@/img/active.gif";
import notActiveRecorder from "@/img/notactive.png";
import LoadingResponse from "@/img/pending.svg";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export const recordingType = "audio/webm";


interface RecorderProps {
  uploadAudio: (blob: Blob) => void;
  recordingStatus: string;
  setRecordingStatus: React.Dispatch<React.SetStateAction<string>>;
}




function Recorder({ uploadAudio, recordingStatus, setRecordingStatus }: RecorderProps ) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { pending } = useFormStatus();
  const [audioChunk, setAudioChunk] = useState<Blob[]>([]);
  

  useEffect(() => {
    getMicPermission();
  }, []);

  const getMicPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        
        });

        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        console.log("the error caught is " + err);
      }
    } else
      toast.error(
        "Hey Habibi, for this app to work, refresh the page and grant microphone permission."
      );
  };

  const startRecording = async () => {
    if (stream === null || pending || mediaRecorder === null) {
      return;
    }

    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType: recordingType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data == undefined) return;
      if (event.data.size < 1) return;

      localAudioChunks.push(event.data);
    };
    setAudioChunk(localAudioChunks);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) {
      return;
    }

    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunk, { type: recordingType });
      uploadAudio(audioBlob);
      setAudioChunk([]);
    };
  };


  return (
    <div className=" flex justify-center py-3 dark:bg-slate-700 bg-slate-400">
      {!permission ? (
        <Button onClick={getMicPermission} className="">
          Grant Mic Permission
        </Button>
      ) : null}

      {pending && (
        <Image
          src={LoadingResponse}
          alt="mic"
          width={50}
          height={50}
          priority={true}
          className="rounded-full "
        />
      )}

      {permission && recordingStatus === "inactive" && !pending ? (
        <Image
          src={notActiveRecorder}
          alt="mic"
          width={50}
          height={50}
          priority={true}
          onClick={startRecording}
          className="rounded-full "
        />
      ) : null}

      {recordingStatus === "recording" ? (
        <Image
          src={activeRecorder}
          alt="mic"
      
          width={50}
          height={50}
          onClick={stopRecording}
          className="rounded-full w-[100px] h-[100px] "
        />
      ) : null}
    </div>
  );
}

export default Recorder;

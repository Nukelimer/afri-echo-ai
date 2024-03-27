"use client";

import React, { useEffect, useState } from "react";
import { clearTimeout } from "timers";

// Replace Interfavce with TYPES!!!!
type State = {
  sender: string;
  response: string | null | undefined;
};

function VoiceSynthesiser({
  state,
  displaySettings,
}: {
  state: State;
  displaySettings: boolean;
}) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, [state]);

  useEffect(() => {
    if (!state.response || !synth) return;

    const wordsToSay = new SpeechSynthesisUtterance(state.response);

    wordsToSay.voice = voice;
    wordsToSay.pitch = pitch;
    wordsToSay.rate = rate;
    wordsToSay.volume = volume;

    synth.speak(wordsToSay);

    return () => {
      synth.cancel();
    };
  }, [state]);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices[0]);
  }, [state]);

  const pitchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(e.target.value));
  };
  const rateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(e.target.value));
  };
  const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  const voiceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === e.target.value);
    if (!voice) {
      return;
    }
    setVoice(voice);
  };

  return (
    <div className="flex flex-col items-center dark:bg-slate-700 bg-slate-400 text-white p-2 z-20">
      {displaySettings && (
        <>
          <div className="w-fit">
            <p className="text-xs text-gray-500 p-2">Voice:</p>
            <select
              value={voice?.name}
              onChange={voiceChangeHandler}
              className="flex-1 dark:bg-slate-600 bg-slate-300 text-slate-600 dark:text-white  p-3">
              {window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-5  flex gap-3">
            <div className="">
              <p>Pitch:</p>
              <input
                type="range"
                max="2"
                min="0.5"
                value="pitch"
                step="0.1"
                onChange={pitchChangeHandler}
                className=" accent-slate-300 dark:accent-slate-500"
              />
            </div>

            <div className="">
              <p>Volume:</p>
              <input
                type="range"
                max="1"
                min="0"
                value="volume"
                step="0.1"
                onChange={volumeChangeHandler}
                className=" accent-slate-300 dark:accent-slate-500"
              />
            </div>

            <div className="">
              <p>Speed:</p>
              <input
                type="range"
                max="2"
                min="0.5"
                value="rate"
                step="0.1"
                onChange={rateChangeHandler}
                className=" accent-slate-300 dark:accent-slate-500"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VoiceSynthesiser;

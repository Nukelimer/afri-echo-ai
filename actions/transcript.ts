"use server";

import {
  AzureKeyCredential,
  ChatRequestMessage,
  OpenAIClient,
} from "@azure/openai";

import toast from "react-hot-toast";

async function transcript(prevState: any, formData: FormData) {
  try {
    console.log(`PREVIOUS STATE: ${prevState} ${formData}`);

    if (
      process.env.AZURE_API_KEY === undefined ||
      process.env.AZURE_ENDPOINT === undefined ||
      process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined ||
      process.env.AZURE_API_KEY === undefined
    ) {
      toast.error("Azure API setup needs attention, for this app to work.");

      return {
        sender: "",
        response: "Azure API setup not set, it needs urgent attention.",
      };
    }

    const file = formData.get("audio") as File;

    if (file.size === 0) {
      return {
        sender: "",
        response: "No audio file was sent.",
      };
    }

    console.log(`this is the file ${file}`);
    const arrayBuffer = await file.arrayBuffer();
    const audio = new Uint8Array(arrayBuffer);

    console.log("Transcribe your voice at this point.");
    const client = new OpenAIClient(
      process.env.AZURE_ENDPOINT,

      new AzureKeyCredential(process.env.AZURE_API_KEY)
    );

    const result = await client.getAudioTranscription(
      process.env.AZURE_DEPLOYMENT_NAME || "", //BE CAREF
      audio
    );
    console.log("Transcription: " + result.text);
    console.log("Result object: " + result);
    const messages: ChatRequestMessage[] = [
      {
        role: "system",

        content:
          "You are Afri Echo AI. You shall answer questions and respond to questions I cannot ",
      },
      {
        role: "user",
        content: result.text,
      },
    ];
    const completions = await client.getChatCompletions(
      process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
      messages,
      { maxTokens: 280 }
    );
    const response = completions?.choices[0].message?.content;

    console.log(response);

    console.log(prevState.sender, "-----", result.text);

    return {
      sender: result.text,
      response: response,
      id: crypto.randomUUID(),
    };
  } catch (error: any) {
    console.log(error);

    return {
      sender: "",
      response: error?.message,
    };
  }
}

export default transcript;

// git status
// git add .
// git commit -m "my commit"
// git push [remote] [branch]
// git push origin staging

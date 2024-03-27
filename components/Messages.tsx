import { Message } from "@/app/afri-echo-ai/page";
import Image from "next/image";
import PulseLoad from "./PulseLoader";


interface Props {
  messages: Message[];
}
function Messages({ messages }: Props) {
  

  return (
    <div
      className={`flex flex-col min-h-screen w-screen max-w-[700px] mx-auto items-center p-5 pt-20 ${
        messages.length > 0 ? "pb-96" : "pb-52"
        } `}>
      
      <PulseLoad/>
      {!messages.length && (
        <div className="flex flex-col space-y-10 flex-1 items-center justify-end">
          <p className="dark:text-gray-200  animate-pulse">
            Habibi, record your question( You can only ask 3 questions per minute).
          </p>
        </div>
      )}

      <div className="p-6">
        {messages.map(({ id, response, sender }) => {

         const text = response.lastIndexOf('.')
          return (
            <div className="" key={id}>
              <div className="flex items-center justify-start flex-row-reverse text-balance  p-4 mt-4 gap-2  mb-4 bg-slate-400 rounded-2xl rounded-br-none">
                <Image
                  height={40}
                  width={30}
                  src={"/images/avatar-not-talking.png"}
                  alt="person"
                  className="dark:bg-white bg-slate-400  rounded-full "
                />
                <p className=" leading-relaxed">
                  {sender}
                </p>
              </div>

              <div className="flex flex-row-reverse items-center justify-start   ">
                <p className="text-balance text- p-4 bg-slate-300 dark:bg-slate-700  rounded-3xl rounded-bl-none w-fit">
                  {text === -1 ? response : response.slice(0, text + 1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Messages;

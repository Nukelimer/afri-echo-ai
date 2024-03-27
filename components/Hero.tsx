import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import Animate from "./Animate";

function Hero() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-col ">
        <div className=" bg-slate-100 -z-10 ">
          <Image
            src="/images/bg.jpg"
            fill
            objectFit="cover"
            quality={100}
            alt="bg image"
            priority
            className="to-blue-900 blur-md"
          />
        </div>
        <div className="relative md:flex p-6 pb-0  overflow-x-hidden">
          <div className="md:w-2/3 ">
            <h1 className="text-3xl text-left mb-6 md:mb-12 text-white">
              {" "}
              Afri Echo AI: Google Assistant | Siri for Web.
            </h1>

            <p className="text-balance text-start mb-6 text-white">
              Meet Afri Echo AI, your all-in-one voice assistant solution. From
              setting reminders to answering your questions and managing your
              schedule, Afri Echo AI is here to make your life easier. With
              state-of-the-art speech recognition technology and advanced AI
              algorithms, Afri Echo AI understands your voice like never before.
              Experience seamless voice interactions and unlock the power of
              natural language processing with Afri Echo AI.
            </p>

            <Link href={"/afri-echo-ai"} className="animate-pulse delay-75 ">
              <Button className=" md:mt-24 hover:bg-green-200 hover:text-white ">
                Expore the Demo.
              </Button>
            </Link>
          </div>

          <Animate />
        </div>
      </div>
    </div>
  );
}

export default Hero;


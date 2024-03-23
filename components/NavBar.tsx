import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Toggle } from "./ui/Toggle";

function NavBar() {
  return (
    <header className="p-6 w-full border-b-2 bg-white dark:bg-secondary z-10 absolute">
      <div className="flex justify-between h-fit items-center ">
        <div className="">
          <Link href={"/"}>
            <div className="">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={64}
                height={40}
                style={{ width: "auto", height: "auto" }}></Image>
            </div>
            <div className="">
              <h1 className="font-semibold">Afri Echo AI</h1>
            </div>
          </Link>
        </div>

        <Link href={'/afri-echo-ai'} className="mt-4 hidden md:flex bg-black dark:bg-white text-white dark:text-black text-center py-3 px-5 rounded">Try for Free</Link>
        

        <div className=" ">

        <Toggle/>
        </div>
      </div>
    </header>
  );
}

export default NavBar;

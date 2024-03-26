import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Toggle } from "./ui/Toggle";
import TryForFree from "./Pathname";


function NavBar() {

 
  return (
    <header className="p-6 w-full border-b-2 border-neutral-300 dark:border-slate-500 bg-slate-400 dark:bg-secondary ">
      <div className="flex justify-between h-fit items-center ">
        <div className="">
          <Link href={"/"}>
            <div className="">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={95}
                height={65}
                style={{  height: "auto" }}></Image>
            </div>
            <div className="">
              <h1 className="font-semibold">Afri Echo AI</h1>
            </div>
          </Link>
        </div>

      <TryForFree/>

        <div className=" ">
          <Toggle />
      </div>
      </div>
    </header>
  );
}

export default NavBar;

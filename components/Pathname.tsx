"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function TryForFree() {
  const path = usePathname();
    return <>
    
    {
    path === '/' && <Link
      href={"/afri-echo-ai"}
      className="mt-4 hidden md:flex bg-black dark:bg-white text-white dark:text-black text-center py-2 px-5 rounded">
      Try for Free
    </Link>
  }
    
    </>
}

export default TryForFree;

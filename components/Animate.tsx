"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
function Animate() {
  const [direction, setDirection] = useState("right");

  const animationCompleteHandler = () => {
    setDirection((prevDirection) =>
      prevDirection === "right" ? "left" : "right"
    );
  };

  const variants = {
    left: { x: "-10%", transition: { ease: "linear", duration: 6} },
    right: { x: "10%", transition: { ease: "linear", duration:  6} },
  };
  return (
    <motion.div
      className=" flex justify-center w-full md:h-[400px] md:w-2/3 "
      animate={direction}
      variants={variants}
      onAnimationComplete={animationCompleteHandler}>
      <Image
        priority
        src={"/images/hero.png"}
        quality={100}
        height={200}
        width={200}
        alt="hero"></Image>
    </motion.div>
  );
}

export default Animate;

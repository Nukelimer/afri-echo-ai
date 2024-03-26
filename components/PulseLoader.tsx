"use client";

import { useFormStatus } from "react-dom";
import { PulseLoader  } from "react-spinners";

function PulseLoad() {
  const { pending } = useFormStatus();
  return (
    pending && (
      <p className="p-6 ml-auto">
        <PulseLoader color="#CBD5E1" />
      </p>
    ) 
  );
}

export default PulseLoad;

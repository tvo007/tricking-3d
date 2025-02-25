import React from "react";

import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress, loaded, item, total } = useProgress();
  return (
    <Html
      className="text-bold absolute text-2xl text-zinc-400 md:text-3xl"
      center
    >
      <div className="flex flex-col justify-center">
        {progress}%
        <div className="p-1 md:p-4">
          Loading Asset
          <br /> {loaded} of {total}
        </div>
        {/* <div className='text-xs'>{item}</div> */}
      </div>
    </Html>
  );
}

export default Loader;

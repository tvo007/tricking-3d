import BackgroundCircles from "@admin/components/BackgroundCircles";
import React from "react";

function AppBackground(props) {
  return (
    <div
      id="App-Background"
      className="fixed top-0 left-0 z-[-2] h-screen w-screen place-content-center bg-gradient-to-b from-zinc-900 to-zinc-800"
    >
      <BackgroundCircles />
      {props.children}
    </div>
  );
}

export default AppBackground;

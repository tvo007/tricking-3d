import { useRouter } from "next/router.js";
import React from "react";
import DonateText from "../contribute/components/DonateText";
import MachineLearning from "./components/MachineLearning";
import WhatDoesItInclude from "./components/WhatDoesItInclude";
import WhyBuildThis from "./components/WhyBuildThis";

function LearnMore() {
  const nav = useRouter();

  return (
    <div className="flex w-full flex-col place-items-center">
      <div className="h-screen w-fit rounded-md bg-zinc-900 bg-opacity-70 px-12">
        <div id="sticky-header" className="sticky top-0 h-14 bg-zinc-900"></div>
        <div className="no-scrollbar m-0 flex h-[88vh] w-full flex-col place-items-center justify-center overflow-y-scroll p-1">
          <div className="flex h-full w-[80vw] max-w-[600px] flex-col place-content-start place-items-center gap-5 font-inter text-zinc-300">
            <h1 className="text-5xl font-bold">Road to Trickedex</h1>
            <p className="indent-4 text-base font-light">
              In order to get where we would like to have this project it will
              take some time and some community support.{" "}
            </p>
            <button
              className="rounded-xl bg-zinc-600 p-2 font-semibold text-sky-400"
              onClick={() => nav.push("/contribute")}
            >
              Contribute
            </button>
            <h2 className="text-2xl font-semibold">What is the Trickedex?</h2>
            <p className="indent-4 text-base font-light">
              The Trickedex is the final goal for the current tricking-3d
              project in the works. The Trickedex is loosely based off the
              concept of the pokedex from Pokemon. This was a directory that had
              access to all of the pokemon and their various information. Many
              people have talked about such a concept for Tricking moves over
              time. It is our attempt to make that a reality.
            </p>
            <WhatDoesItInclude />
            <MachineLearning />

            <WhyBuildThis />
            <DonateText />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;

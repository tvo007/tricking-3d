import React, { useState } from "react";
import Link from "next/link";
import { animated, config, useSpring, useTransition } from "react-spring";
import StanceCircleColor from "../../data/AdvancedStancesSelectorColor";
import HamburgerMenu from "../../data/icons/HamburgerMenu";
import HomeIcon from "../../data/icons/HomeIcon";
import TheoryCap from "../../data/icons/TheoryCap";
import TransitionsIcon from "../../data/icons/TransitionsIcon";
import TricksIcon from "../../data/icons/TricksIcon";
import { useRouter } from "next/router";
function TheoryTabBar() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const location = useRouter();
  const hamburger = useTransition(openHamburger, {
    from: { opacity: 0, right: "-40vw" },
    enter: { opacity: 1, right: "0" },
    leave: { opacity: 0, right: "-40vw" },
    reverse: openHamburger,
    delay: 100,
    config: { durration: 1200, tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  return (
    <>
      <div
        id="TheoryTabBar"
        className="fixed bottom-0 left-0 z-[100] flex h-fit w-full place-content-center place-items-center
				 justify-around gap-0 rounded-t-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300"
      >
        <Link onClick={() => setOpenHamburger(false)} href="/home">
          <HomeIcon />
        </Link>
        <Link onClick={() => setOpenHamburger(false)} href="/theory">
          <TheoryCap />
        </Link>
        <Link onClick={() => setOpenHamburger(false)} href="/theory/stances">
          <div className="w-full">
            <StanceCircleColor />
            <div className="text-xs">Stances</div>
          </div>
        </Link>
        <Link
          onClick={() => setOpenHamburger(false)}
          href="/theory/transitions"
        >
          <div className="flex w-full flex-col place-items-center">
            <TransitionsIcon className=" flex h-12 place-content-center" />
            <div className="text-xs">Transitions</div>
          </div>
        </Link>
        <Link onClick={() => setOpenHamburger(false)} href="/theory/tricks">
          <TricksIcon className="flex h-12 place-content-center" />
          <div className="text-xs">Tricks</div>
        </Link>

        <HamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
      </div>
      {/* Open Hamburger Menu Display */}
      {hamburger(
        (styles, hamburgerMenu) =>
          hamburgerMenu && (
            <animated.div
              style={styles}
              onClick={() => setOpenHamburger(!openHamburger)}
              className="fixed bottom-14 z-[369] rounded-l-xl"
            >
              <animated.div className="  flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white">
                <div className="text-bold">Variations</div>
                <div className="flex flex-col gap-2 text-zinc-400">
                  <Link href="/theory/axes">Axes</Link>
                  <Link href="/theory/touchdowns">Touchdowns</Link>
                  <Link href="/theory/rotations">Rotations</Link>
                  <Link href="/theory/kicks">Kicks</Link>
                  <Link href="/theory/grabs">Grabs</Link>
                  <Link href="/theory/shapes">Shapes</Link>
                </div>
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
}

export default TheoryTabBar;

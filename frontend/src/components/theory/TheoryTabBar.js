import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FaGraduationCap, FaToolbox } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { animated, config, useSpring, useTransition } from "react-spring";
import { ReactComponent as StanceCircleColor } from "../../data/AdvancedStancesSelectorColor.svg";
import { ReactComponent as TransitionFeet } from "../../data/ComboMakerSVG/Left.svg";
function TheoryTabBar() {
	const [openHamburger, setOpenHamburger] = useState();
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
				id='TheoryTabBar'
				className='fixed bottom-0 left-0 z-[80] flex h-fit w-full place-content-center place-items-center gap-8 rounded-t-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300'>
				<Link onClick={() => setOpenHamburger(false)} to='/3d/home'>
					<AiOutlineHome />
				</Link>
				<Link onClick={() => setOpenHamburger(false)} to='3d/theory/stances'>
					<div classname='w-full'>
						<StanceCircleColor />
						<div className='text-xs'>Stances</div>
					</div>
				</Link>
				<Link
					onClick={() => setOpenHamburger(false)}
					to='/3d/theory/transitionList'>
					<div className='flex w-full flex-col place-items-center'>
						<TransitionFeet className=' flex h-12 place-content-center' />
						<div className='text-xs'>Transitions</div>
					</div>
				</Link>
				<Link onClick={() => setOpenHamburger(false)} to='/3d/theory/trickList'>
					<div className='text-xs'>Vert Kicks</div>
				</Link>

				<GiHamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
			</div>
			{/* Open Hamburger Menu Display */}
			{hamburger(
				(styles, hamburgerMenu) =>
					hamburgerMenu && (
						<animated.div
							style={styles}
							onClick={() => setOpenHamburger(!openHamburger)}
							className='fixed bottom-14 rounded-l-xl'>
							<animated.div className=' flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white'>
								<Link to='/3d/about'>About</Link>
								<Link to='/3d/contribute'>Contibute</Link>
								<Link to='/3d/learnMore'>Learn More</Link>
							</animated.div>
						</animated.div>
					)
			)}
		</>
	);
}

export default TheoryTabBar;

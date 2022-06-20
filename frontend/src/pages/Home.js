import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeScene } from "../scenes/HomeScene";
import Loader from "../components/loaders/Loader";
import { useNavigate, Link } from "react-router-dom";
import MultiDonateButton from "../components/info/MultiDonateButton";
import { TorqueScene } from "../scenes/TorqueScene";
import { FaGraduationCap } from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import { ReactComponent as ComboMakerBlueprint } from "../data/ComboMakerBlueprint.svg";
import { RGB_ETC1_Format } from "three";

function Home() {
	const user = useUserStore((s) => s.user);
	const accessToken = useUserStore((s) => s.accessToken);
	const navigate = useNavigate();
	return (
		<div className='sticky mt-14'>
			<div
				id='AppBackground-flex'
				className='flex h-screen w-screen flex-col place-items-center'>
				<div className='w-full text-center text-zinc-200'>
					<h1 className='text-xl '>
						Welcome to{" "}
						<div className='inline font-black'>Tricking-3D {user}</div>
					</h1>
				</div>
				<Link
					to='/learnmore'
					className='m-2 rounded-3xl bg-indigo-600 px-2 py-0 font-inter font-semibold text-zinc-300'>
					Learn More
				</Link>

				<Link
					to='/sandbox/'
					id='canvas-container'
					className='m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[40vh] md:w-[90vh] '>
					<Suspense fallback={<Loader />}>
						<Canvas className='rounded-2xl'>
							<Suspense fallback={<Loader />}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</Suspense>

					<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
						<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
							Enter Sandbox
						</h1>
					</div>
				</Link>

				{/* <div className='m-2 rounded-2xl bg-red-700 p-4 text-center text-white'>
					UNDERGOING REDESIGN <br></br>THINGS WILL BREAK
				</div> */}
				<Link className='' to='/instructions'>
					<div className='flex w-[90vw] flex-col place-items-center justify-center gap-5 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-800 p-2 font-bold text-zinc-300'>
						<div>Instructions</div>
					</div>
				</Link>

				<div className='m-2 flex w-full place-content-center gap-4 rounded-xl p-2 text-zinc-300'>
					<Link
						className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800  text-4xl'
						to='/comboMaker'>
						<ComboMakerBlueprint fill={"#d4d4d8"} />
						<div className='mt-[-14px] text-sm font-bold'>Combo Maker</div>
					</Link>
					<Link
						className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800 text-6xl'
						to='/theory'>
						<FaGraduationCap />
						<div className='text-sm font-bold'>Theory</div>
					</Link>
				</div>
				{accessToken === null && (
					<div className=' flex gap-4'>
						<Link to='/login'>
							<div className='w-fit rounded-xl bg-zinc-300 p-3'>LOGIN</div>
						</Link>
						<Link to='/register'>
							<div className='w-fit rounded-xl bg-zinc-700 p-3 text-zinc-300'>
								REGISTER
							</div>
						</Link>
					</div>
				)}

				<div className='bottom-8 py-8'>
					<MultiDonateButton />
				</div>
			</div>
		</div>
	);
}

export default Home;

import React, { useState } from "react";

const AddSessionPage = () => {
	const whatsToday = () => {
		let today = new Date(Date.now());
		return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
			-2
		)}-${("0" + today.getDate()).slice(-2)}`;
	};
	let todaytime = new Date(Date.now()).toISOString().slice(-13, -8);
	const onSubmit = (e) => {
		e.preventDefault();
		console.log("submitting", e);
	};
	const [count, setCount] = useState(1);
	return (
		<div className='mt-14 flex flex-col items-center text-zinc-300'>
			<div className='p-2 text-center font-titan text-2xl'>Submit Session</div>
			<form
				onSubmit={onSubmit}
				className='flex w-[80vw] flex-col gap-2 rounded-md bg-zinc-700 p-3'>
				{Array.from(Array(count).keys()).map((i) => (
					<div className='flex w-full gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'>
						<input
							id='url'
							className='w-full bg-transparent p-1 text-zinc-300'
							type='url'
							placeholder={`https://your-video.com/goes-here${i}`}
						/>
						<span
							className='text-2xl leading-none text-red-500'
							onClick={() => setCount((c) => c - 1)}>
							-
						</span>
					</div>
				))}
				<span
					onClick={() => setCount((c) => c + 1)}
					className='flex place-items-center gap-2 font-titan'>
					<span>Add Another URL Source</span>
					<span className='text-2xl leading-none text-emerald-500'>+</span>
				</span>
				<input
					id='name'
					type='text'
					className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
					placeholder='Session Name'
				/>
				<input
					id='date'
					type='date'
					value={whatsToday()}
					className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
				/>
				<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
					<label className='w-1/6 pl-2' htmlFor='startTime'>
						Start
					</label>
					<input
						id='startTime'
						className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
						type='time'
						value={todaytime}
					/>
				</div>
				<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
					<label className='w-1/6 pl-2' htmlFor='endTime'>
						End
					</label>
					<input
						id='endTime'
						className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
						type='time'
						value={todaytime}
					/>
				</div>

				<button className='rounded-lg bg-emerald-500 p-2'>
					Start Processing
				</button>
			</form>
		</div>
	);
};

export default AddSessionPage;

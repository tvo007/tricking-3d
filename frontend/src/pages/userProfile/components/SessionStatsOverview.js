import React from "react";
import { a } from "react-spring";

const SessionStatsOverview = ({ summary }) => {
	let sessionCombosArr = summary?.SessionData;
	let sessionTricksArr = summary?.SessionData?.map(
		(s) => s.ClipLabel.comboArray
	)
		?.flat()
		?.sort((a, b) => {
			if (a.type > b.type) return 1;
			if (a.type < b.type) return -1;
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	let longestCombo = sessionCombosArr?.sort((a, b) => {
		if (a.ClipLabel.comboArray.length > b.ClipLabel.comboArray.length)
			return -1;
		if (a.ClipLabel.comboArray.length < b.ClipLabel.comboArray.length) return 1;
		return 0;
	})?.[0]?.ClipLabel;
	let greatestCombo = sessionCombosArr?.sort((a, b) => {
		if (a.ClipLabel.comboArray.pointValue > b.ClipLabel.comboArray.pointValue)
			return -1;
		if (a.ClipLabel.comboArray.pointValue < b.ClipLabel.comboArray.pointValue)
			return 1;
		return 0;
	})?.[0]?.ClipLabel;
	let uniqueTricks = [
		...new Map(sessionTricksArr?.map((item) => [item["name"], item])).values(),
	];
	let tricksByPoints = sessionTricksArr?.sort((a, b) => {
		if (a.pointValue > b.pointValue) return -1;
		if (a.pointValue < b.pointValue) return 1;
		return 0;
	});
	let totalPoints = summary?.SessionData?.reduce(
		(sum, b) => sum + b?.ClipLabel?.pointValue,
		0
	);
	let trickPercentage = (tricksByPoints?.[0]?.pointValue / totalPoints) * 100;
	let comboPercentage = (greatestCombo.pointValue / totalPoints) * 100;
	return (
		<div className='grid w-full grid-cols-2 flex-col gap-1 text-xs'>
			<div className='col-span-2 place-self-center'>
				<span className='text-zinc-400'>TP: </span>
				<span>{totalPoints}</span>
			</div>
			<div className='relative col-span-2 h-[4px] w-full rounded-md bg-indigo-300'>
				<div
					style={{ width: `${comboPercentage}%` }}
					className='absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-indigo-500'
				/>
				<div
					style={{ width: `${trickPercentage}%` }}
					className='absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-indigo-700'
				/>
			</div>
			<div className='flex flex-col'>
				<div>
					<span className='text-zinc-400'>#C: </span>
					{sessionCombosArr?.length}
				</div>
				<div>
					<span className='text-zinc-400'>#T:</span> {sessionTricksArr?.length}
				</div>
			</div>
			<div className='grid gap-2'>
				<div className='rounded-md bg-zinc-900 p-2'>
					<span className='text-zinc-400'>UT: </span>
					{uniqueTricks?.filter((t) => t?.type === "Trick").length}
				</div>
				<div className='rounded-md bg-zinc-900 p-2'>
					<span className='text-zinc-400'>UTr: </span>
					{uniqueTricks?.filter((t) => t?.type === "Transition")?.length}
				</div>
			</div>
			<div className='col-span-2'>
				<span className='text-zinc-400'>Greatest Trick: </span>
				{tricksByPoints?.[0]?.name}
			</div>

			<div className='col-span-2 w-[100%] whitespace-pre-wrap break-words'>
				<span className='text-zinc-400'>
					Longest {longestCombo?.name === greatestCombo?.name && "& Greatest"}{" "}
					Combo:
				</span>{" "}
				{longestCombo?.name}
			</div>
			{longestCombo?.name !== greatestCombo?.name && (
				<div>
					<span className='text-zinc-400'>Greatest Combo: </span>
					{greatestCombo?.name}
				</div>
			)}
		</div>
	);
};

export default SessionStatsOverview;

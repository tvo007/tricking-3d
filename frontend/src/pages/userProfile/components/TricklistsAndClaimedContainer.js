import React, { useState } from "react";

const TricklistsAndClamiedContainer = ({ MyTricklists, Claimed }) => {
	const [activePane, setActivePane] = useState("Tricklists");
	return (
		<>
			<div className='flex w-[80vw] place-content-center place-items-center gap-2'>
				<div
					onClick={(e) => setActivePane(e.target.innerText)}
					className='w-full rounded-t-md bg-zinc-700 p-2'>
					Tricklists
				</div>
				<div
					onClick={(e) => setActivePane(e.target.innerText)}
					className='w-full rounded-t-md bg-zinc-700 p-2'>
					Claimed
				</div>
			</div>
			{activePane === "Tricklists" && (
				<div className='flex h-[37vh] w-[80vw] flex-col place-content-center place-items-center bg-zinc-700'>
					{(MyTricklists?.length &&
						MyTricklists?.map((list) => <div>{list?.name}</div>)) ||
						"No Tricklists to Display"}
				</div>
			)}
			{activePane === "Claimed" && (
				<div className='flex h-[37vh] w-[80vw] flex-col place-content-center place-items-center bg-zinc-700'>
					{(Claimed?.length &&
						MyTricklists?.map((list) => <div>{list?.name}</div>)) ||
						"No ClaimedTricks to Display"}
				</div>
			)}
		</>
	);
};

export default TricklistsAndClamiedContainer;

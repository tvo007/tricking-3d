import React, { Suspense, useEffect, useState } from "react";
import { stanceArr, transArr, TrickListArr } from "../../data/TricklistClass";
import { stances } from "../../data/trickDataModel/TrickObjects";

import {
	Stance,
	Transition,
	Trick,
} from "../../data/trickDataModel/TrickClasses";
import ArrayDisplay from "./comboMaker/ArrayDisplay";
import { useComboMakerStore } from "../../store/comboMakerStore";
import CurrentStateInfo from "./comboMaker/CurrentStateInfo";
import ResetButton from "./comboMaker/ResetButton";
import NewComboDisplay from "./comboMaker/newComboDisplay";
import useComboMaker from "./comboMaker/useComboMaker";
import AdvancedStanceCircle from "./AdvancedStanceCircle";
import { ReactComponent as StanceCircle } from "../../data/AdvancedStancesSVG.svg";
import StanceAnimationTest from "./stances/StanceAnimationTest";
import TransitionButtons from "./comboMaker/TransitionButtons";
import { Canvas } from "@react-three/fiber";
import Loader from "../loaders/Loader";
import { TrickListScene } from "../../scenes/TrickListScene";

let newCombo = [];
function ComboMaker() {
	const [combo, setcombo] = useState();

	const {
		currentDirection,
		currentLeg,
		currentStance,
		currentTransition,
		isDelete,
		isTrick,
		setCurrentLeg,
		setCurrentStance,
		setCurrentDirection,
		setIsDelete,
		setIsTrick,
	} = useComboMaker(combo, setcombo, newCombo);

	//OnClick handlers
	function handleTrickAdd(e) {
		setcombo(e);
		setCurrentLeg(e.toLeg);
	}
	function handleStanceAdd(e) {
		setCurrentStance(stances[e] ? stances[e]?.name : currentStance);
		setCurrentLeg(e.getTrick().fromLeg);
		setcombo(e);
	}
	function resetTricklist() {
		newCombo = [];
		setcombo();
		setCurrentLeg("Left");
		setCurrentStance("BacksideComplete");
		setCurrentDirection("Backwards");
		setIsTrick(true);
	}
	function deleteLast() {
		setIsDelete(!isDelete);
		// Handles Switching Legs to ComboEnd
		if (currentLeg !== newCombo[newCombo.length - 1]?.toLeg) {
			if (newCombo[newCombo.length - 1]?.toLeg) {
				setCurrentLeg(
					newCombo[newCombo.length - 1]?.toLeg ||
						newCombo[newCombo.length - 1]?.leg ||
						newCombo[newCombo.length - 2]?.leg ||
						"Left"
				);
			}
		}
	}

	//Filters
	let filteredStances = stanceArr.filter(
		(e) =>
			(e.leg == currentLeg && !isTrick) ||
			(isTrick && e.landingStyle == stances[currentStance].landingStyle)
	);
	let filteredTricks = TrickListArr.filter(
		(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
	);
	let isEmpty = filteredTricks.length == 0;
	let filteredTransitions = transArr.filter(
		(e) =>
			(!isEmpty && e.fromLeg == stances[currentStance]?.leg) ||
			(isEmpty && e.fromLeg == currentLeg)
	);
	// let rotation = currentTransition?.getNewRotation(currentStance);
	return (
		<div id='comboMaker-wrapper' className='font-inter h-[80vh] w-[90vw]'>
			{/* Page Title */}
			<div id='pageTitle' className=' text-2xl font-bold text-zinc-400'>
				ComboMaker
			</div>
			<div
				id='app-content'
				className='flex h-[80vh] w-full flex-col place-content-center place-items-center overflow-y-auto rounded-lg bg-sky-500 p-2 text-zinc-300'>
				<div id='stateInfo-button-wrapper'>
					{/* CurrentState Display */}
					<CurrentStateInfo
						newCombo={newCombo}
						currentStance={currentStance}
						currentLeg={currentLeg}
						currentDirection={currentDirection}
					/>
				</div>

				{/* Output for 3dView */}
				<div
					id='3dCanvas'
					className='mt-2 h-[10rem] w-full rounded-xl bg-zinc-700'>
					<Canvas>
						<Suspense fallback={<Loader />}>
							<TrickListScene
								trick={newCombo.map((nC) => nC.name).toString()}
							/>
						</Suspense>
					</Canvas>
				</div>
				{/* newCombo State Array */}
				<NewComboDisplay newCombo={newCombo} />
				{/* Button Container */}
				<div
					id='selectables-container'
					className='grid h-[18rem] grid-flow-row grid-cols-2 gap-2 overflow-hidden overflow-y-auto'>
					{/* Current Options Array for Selection */}
					{/* FilteredTricks */}
					<div
						id='left-column-tricks-n-stances'
						className='flex w-full flex-col gap-2 '>
						<ArrayDisplay
							bg
							startOpen
							isEmpty={isEmpty}
							name={"Tricks"}
							arr={filteredTricks}
							f={(e) => handleTrickAdd(e)}></ArrayDisplay>
						{/* FilteredStances */}
						<div className=''>
							<ArrayDisplay
								bg
								isCollapsable
								isAnimated
								name='Stances'
								arr={filteredStances}
								f={(e) => handleStanceAdd(e)}></ArrayDisplay>
						</div>
					</div>
					<div
						id='right-column-transitions-stanceCircle'
						className='flex flex-col'>
						{/* FilteredTransitions */}
						<ArrayDisplay
							isCollapsable
							name={<TransitionButtons currentLeg={currentLeg} />}
							arr={filteredTransitions}
							f={(e) => handleTrickAdd(e)}></ArrayDisplay>
						{/* StanceCircleAnimation */}
						<div className='h-40 w-40'>
							<StanceAnimationTest
								handleStanceAdd={handleStanceAdd}
								isSmall
								currentStance={currentStance}
							/>
						</div>
					</div>
					{/* Reset Buttons */}
					<div
						id='reset-buttons-container'
						className='fixed left-[20%] bottom-12 flex flex-row place-content-center place-items-center'>
						<ResetButton
							resetTricklist={resetTricklist}
							deleteLast={deleteLast}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComboMaker;
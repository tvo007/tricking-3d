/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useStore } from "./store";
useGLTF.preload("../AnimatingTest.gltf");
export function Fred(props) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("../AnimatingTest.gltf");
	const { actions } = useAnimations(animations, group);
	const aI = useStore((state) => state.aI);
	const isPlaying = useStore((state) => state.isPlaying);
	const animationsArr = [actions.BKick, actions.Backflip];
	const setAnimationsArray = useStore((state) => state.updateAnimationArray);
	const aA = useStore((state) => state.animationsArray);
	const modelValue = useStore((state) => state.modelValue);

	//AnimationPlayer
	// if (isPlaying !== undefined) {
	// 	animationsArr[aI].play();
	// 	isPlaying
	// 		? (animationsArr[aI].timeScale = 1)
	// 		: (animationsArr[aI].timeScale = 0);
	// }

	//Fred
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
				<primitive object={nodes.mixamorig1Hips} />
				<skinnedMesh
					geometry={nodes.Fred.geometry}
					material={materials.Fred}
					skeleton={nodes.Fred.skeleton}
				/>
			</group>
		</group>
	);
}

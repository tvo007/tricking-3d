/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 AshelyElfTricks.glb Ashley.jsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import useMediaController from "../hooks/useMediaController";
import useFollowCam from "../hooks/useFollowCam";
export function Ashley(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/AshelyElfTricks.glb");
  const { actions, names, mixer } = useAnimations(animations, group);
  const hipsRef = useRef();
  useMediaController(actions, names, mixer);
  useFollowCam(hipsRef);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="AshleyAdamsElfTricks" scale={0.01}>
          <primitive ref={hipsRef} object={nodes.pelvis} />
          <group name="CC_Base_Eye">
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Eye_1"
              geometry={nodes.CC_Base_Eye_1.geometry}
              material={materials.Std_Eye_R}
              skeleton={nodes.CC_Base_Eye_1.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Eye_2"
              geometry={nodes.CC_Base_Eye_2.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_Eye_2.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Eye_3"
              geometry={nodes.CC_Base_Eye_3.geometry}
              material={materials.Std_Eye_L}
              skeleton={nodes.CC_Base_Eye_3.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Eye_4"
              geometry={nodes.CC_Base_Eye_4.geometry}
              material={materials.Std_Cornea_L}
              skeleton={nodes.CC_Base_Eye_4.skeleton}
            />
          </group>
          <group name="CC_Base_Teeth">
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Teeth_1"
              geometry={nodes.CC_Base_Teeth_1.geometry}
              material={materials.Std_Upper_Teeth}
              skeleton={nodes.CC_Base_Teeth_1.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Teeth_2"
              geometry={nodes.CC_Base_Teeth_2.geometry}
              material={materials.Std_Lower_Teeth}
              skeleton={nodes.CC_Base_Teeth_2.skeleton}
            />
          </group>
          <skinnedMesh
            frustumCulled={false}
            name="Dress"
            geometry={nodes.Dress.geometry}
            material={materials["_.003"]}
            skeleton={nodes.Dress.skeleton}
          />
          <group name="Hair">
            <skinnedMesh
              frustumCulled={false}
              name="Hair_1"
              geometry={nodes.Hair_1.geometry}
              material={materials.Scalp_High_polytail_Transparency}
              skeleton={nodes.Hair_1.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Hair_2"
              geometry={nodes.Hair_2.geometry}
              material={materials.High_polytail_Transparency}
              skeleton={nodes.Hair_2.skeleton}
            />
          </group>
          <skinnedMesh
            frustumCulled={false}
            name="Neck"
            geometry={nodes.Neck.geometry}
            material={materials["_.002"]}
            skeleton={nodes.Neck.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Pants"
            geometry={nodes.Pants.geometry}
            material={materials["_.001"]}
            skeleton={nodes.Pants.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Shirt"
            geometry={nodes.Shirt.geometry}
            material={materials._}
            skeleton={nodes.Shirt.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Game_Body"
            geometry={nodes.CC_Game_Body.geometry}
            material={materials.Ga_Skin_Body}
            skeleton={nodes.CC_Game_Body.skeleton}
            morphTargetDictionary={nodes.CC_Game_Body.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Game_Body.morphTargetInfluences}
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Game_Tongue"
            geometry={nodes.CC_Game_Tongue.geometry}
            material={materials.Ga_Skin_Body}
            skeleton={nodes.CC_Game_Tongue.skeleton}
            morphTargetDictionary={nodes.CC_Game_Tongue.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Game_Tongue.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/AshelyElfTricks.glb");

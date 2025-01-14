/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function JapanShrine(props) {
  const { nodes, materials } = useGLTF("/japanshrine.glb");
  return (
    <group {...props} dispose={null} position={[0, -0.0001, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 20, 0]}>
          <group scale={100}>
            <mesh
              geometry={nodes.Cylinder_011.geometry}
              material={materials.Japanese_Shrine_Mat}
            />
          </group>
        </group>
        {/* <group rotation={[0.8, 0.65, 0.3]}>
					<directionalLight intensity={753.98} decay={2} />
				</group>
				<group rotation={[-0.53, -1.21, -0.75]}>
					<directionalLight intensity={502.65} decay={2} color='#a5f3e1' />
				</group>
				<group rotation={[-1.13, 0.28, 2.78]}>
					<directionalLight intensity={628.32} decay={2} color='#6cafdc' />
				</group>
				<group rotation={[0.67, -0.27, -0.5]}>
					<directionalLight decay={2} color='#a0a0a0' />
				</group> */}
        <mesh
          geometry={nodes.asset.geometry}
          material={materials.lawngrass_a_mat}
        />
        <mesh
          geometry={nodes.asset_1.geometry}
          material={materials.lawngrass_a_mat}
        />
        <mesh
          geometry={nodes.Plane.geometry}
          material={materials.Grass_Cut_01}
          scale={74.65}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/japanshrine.glb");

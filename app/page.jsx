'use client'

import { useEffect, useState } from 'react'
// import { EffectComposer, Noise, Vignette, HueSaturation, GodRays } from '@react-three/postprocessing'
import dynamic from 'next/dynamic'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl, useGLTF, Fog } from '@react-three/drei'
import { FogExp2, Mesh } from 'three'
import { Canvas, useFrame, useDrag } from '@react-three/fiber'


// const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
// const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
// const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
// const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
//   ssr: false,
//   loading: () => (
//     <div className='flex h-96 w-full flex-col items-center justify-center'>
//       <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
//         <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
//         <path
//           className='opacity-75'
//           fill='currentColor'
//           d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//         />
//       </svg>
//     </div>
//   ),
// })
// const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

function Model(props) {
  const { nodes, materials } = useGLTF('/seamless.glb')
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousY, setPreviousY] = useState(null);

  const onPointerDown = (e) => {
    setIsDragging(true);
    setPreviousY(e.clientY);
  };

  const onPointerUp = () => {
    setIsDragging(false);
    setPreviousY(null);
  };

  const onPointerMove = (e) => {
    if (isDragging) {
      const deltaY = e.clientY - previousY;
      if (meshRef.current) {
        meshRef.current.rotation.x += deltaY * 0.01; // Adjust rotation speed
      }
      setPreviousY(e.clientY);
    }
  };

  return (
    // <group {...props} dispose={null}>
    //   <mesh
    //    // Handle the case when the pointer leaves the object
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.Sphere.geometry}
    //     material={materials['16 - Default']}
    //     // rotation={[0,0,0]}
    //     // rotation={[0, 0, 0]}
    //     scale={[0.01, 0.01, 0.01]}

    //   />
    // </group>
    <group {...props} dispose={null}
    ref={meshRef}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerMove={onPointerMove}
    onPointerOut={onPointerUp}>
      
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Sphere_1.geometry}
      material={materials['16 - Default']}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, 0, 0]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Sphere_2.geometry}
      material={materials.image2}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, 0, 0]}
    />
    <mesh castShadow receiveShadow geometry={nodes.Sphere_3.geometry} material={materials.plus} />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Sphere_4.geometry}
      material={materials.image1}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, 0, 0]}
    />
  </group>
  )
}


export default function Page() {
  return (
    <>
    <div style={{height:'100vh', width:'100vw', background:'black'}}>
      <Canvas>
        {/* <Environment background preset='warehouse'/> */}
        {/* <FogExp2 color="#000000"/> */}
        
        <fog attach="fog" args={['#17171b', 30, 40]} />
        {/* <OrbitControls/> */}
        <ambientLight intensity={10}/>
        <pointLight position={[20, 30, 10]} intensity={40} decay={0.4} />
        <pointLight position={[100, -10, -10]} color='blue' decay={0.4} />
        <PerspectiveCamera makeDefault fov={40} position={[0, 0.7, 1]} />
        <mesh rotation={[45,230,0]}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <Model/>
      </Canvas>
      </div>
    </>
  )
}


useGLTF.preload('/seamless.glb')
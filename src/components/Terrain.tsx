import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  DoubleSide,
  BufferGeometry,
  Float32BufferAttribute,
  Color,
  Raycaster,
  Vector2,
  PlaneGeometry,
  ShaderMaterial
} from "three";
import { levaStore, useControls } from "leva";
import useGamaStore from "../store";
import { getChunkCoordinates } from "../functions/functions";
import { useKeyboardControls } from "../intereaction";
import { useCanvasHover } from "../intereaction";
import { generateTerrain } from "../functions/generateTerrain";
import { isOutOfBound } from "../functions/functions";

import { vertexShader, fragmentShader } from './chunkGridShader';

export const Terrain = () => {

  const [loading, setLoading] = useState(true);
  const [firstStart, setFirstStart] = useState(false);

  const { width, depth, resolution, scale, seed, offsetX, offsetY } = useControls({
    width: { value: 100, min: 1, max: 200 },
    depth: { value: 100, min: 1, max: 200 },
    resolution: { value: 3, min: 3, max: 50 },
    scale: { value: 50, min: 10, max: 100 },
    seed: "42",
    offsetX: { value: 0, min: -100, max: 100 },
    offsetY: { value: 0, min: -100, max: 100 },
  });

  const { speed } = useControls({
    speed: { value: 0.1, min: 0, max: 0.5 },
  });

  const gridConfig = useControls({
    chunkSize: { value: 1, min: 1, max: 200 },
    subGrids: { value: 5, min: 1, max: 20, step: 1 },
    lineWidth: { value: 0.2, min: 0.01, max: 0.5 },
    gridColor: '#ff0000',
    subGridColor: '#ffffff',
  });

  const { camera } = useThree();

  // const showResources = useGamaStore((state) => state.showResources);
  const canPlaceBeacon = useGamaStore((state) => state.canPlaceBeacon);
  const beacons = useGamaStore((state) => state.beacons);
  const scanRadius = useGamaStore((state) => state.scanRadius);
  const activePosition = useGamaStore((state) => state.activePosition);

  // const [scanningArea, setScanningArea] = useState(null);
  // const pulsingCirclePosition = useGamaStore((state) => state.activePosition);
  // const canPlaceBeacon = useGamaStore((state) => state.canPlaceBeacon);
  // const selectResource = useGamaStore((state) => state.selectRecource);
  const planeRef = useRef();
  const meshRef = useRef();
  const terrainGeometry = useRef(new BufferGeometry());
  const offset = useRef({ x: 0, y: 0 });
  const direction = useRef({ x: 0, y: -1 });
  const customSpeed = useRef(1);
  // const [selectedResource, setSelectedResource] = useState(null);
  // const [resources, setResources] = useState([]);
  const resources = useRef([]);

  const raycaster = new Raycaster();

  // useEffect(() => {
  //   if (!firstStart) {
  //     setFirstStart(true);
  //   }
  // }, [firstStart]);
  // useKeyboardControls({ direction, customSpeed });
  useKeyboardControls({
    direction,
    customSpeed,
    raycaster,
    meshRef,
    camera
  });

  useCanvasHover({ camera, raycaster, meshRef, resources });

  // useCanvasClick({
  //   camera,
  //   raycaster,
  //   handleObjectClick,
  //   meshRef,
  //   resources,
  //   offsetX,
  //   offsetY,
  // });
  useEffect(() => {
    const resources = updateTerrainGeometry();
    if (resources && loading) {
      setLoading(false);
      console.log("Terrain is ready");
    }
  }, [width, depth, resolution, scale, seed, offsetX, offsetY, canPlaceBeacon, activePosition]);

  useEffect(() => {
    generateGridGeometry();
  }, [width, depth, gridConfig]);

  const updateTerrainGeometry = () => {
    const { colors, resources: generatedResources } = generateTerrain(
      width,
      depth,
      resolution,
      scale,
      seed,
      offset.current.x + offsetX,
      offset.current.y + offsetY,
      terrainGeometry.current,
      canPlaceBeacon,
      activePosition,
      scanRadius
    );
    terrainGeometry.current.setAttribute("color", new Float32BufferAttribute(colors, 3));
    resources.current = generatedResources;

    if (meshRef.current) {
      meshRef.current.geometry = terrainGeometry.current;
    }

    return resources.current;
  };

  const updateBeacons = (deltaX: number, deltaY: number) => {
    const updatedBeacons = beacons
      .map((beacon: { position: { x: any; y: any; z: any; }; visible: boolean; }) => {
        const newPosition = {
          x: parseFloat((beacon.position.x - deltaX).toFixed(2)),
          y: beacon.position.y,
          z: parseFloat((beacon.position.z - deltaY).toFixed(2)),
        };

        // Check bounds here if necessary
        beacon.visible = !isOutOfBound(newPosition, width, depth, offsetX, offsetY);
        beacon.position = newPosition;

        return beacon;
      })
      .filter(Boolean);

    useGamaStore.setState({ beacons: updatedBeacons });
  };

  const generateGridGeometry = () => {
    const planeGeometry = new PlaneGeometry(width, depth, 1, 1);
    const planeMaterial = new ShaderMaterial({
      uniforms: {
        chunkSize: { value: gridConfig.chunkSize },
        offset: { value: new Vector2(0, 0) },
        subGrids: { value: gridConfig.subGrids },
        lineWidth: { value: gridConfig.lineWidth },
        gridColor: { value: new Color(gridConfig.gridColor) },
        subGridColor: { value: new Color(gridConfig.subGridColor) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });

    planeRef.current.geometry = planeGeometry;
    planeRef.current.material = planeMaterial;
  };

  const updateLevaWidthAndDepth = (width: number, depth: number) => {
    levaStore.set({ width, depth });
  };


  useFrame(() => {

    if (!loading && !firstStart) {
      // Animate width and depth from 10 to full size after loading
      console.log("First start");
      // updateLevaWidthAndDepth(0, 0);
      setFirstStart(true); // Prevent multiple initializations









      // const newWidth = Math.min(width + 1, 100);
      // const newDepth = Math.min(depth + 1, 100);
      // console.log("newWidth:", newWidth, newDepth);
      // updateLevaWidthAndDepth(newWidth, newDepth);
      // if (newWidth !== 100 || newDepth !== 100) {
      //   // setFirstStart(true);
      // }
    }

    // if (firstStart) {
    //   // console.log("First start");
    //   // Animate width and depth from 10 to full size after loading
    //   const newWidth = Math.min(width + 2, 100);
    //   const newDepth = Math.min(depth + 2, 100);
    //   updateLevaWidthAndDepth(newWidth, newDepth);
    // }
    const deltaX = direction.current.x * (speed * customSpeed.current);
    const deltaY = direction.current.y * (speed * customSpeed.current);
    // if (!firstStart) {
    //   // animate width and depth from 0 to 100
    //   const newWidth = Math.min(width + 1, 100);
    //   const newDepth = Math.min(depth + 1, 100);
    //   updateLevaWidthAndDepth(newWidth, newDepth);
    //   if (newWidth === 100 && newDepth === 100) {
    //     setFirstStart(true);
    //   }
    // }
    // console.log("deltaX:", deltaX, deltaY);
    offset.current.x += deltaX;
    offset.current.y += deltaY;

    // console.log("global position:", getChunkCoordinates(offset.current.x + offsetX + 100, offset.current.y + offsetY + 100, width).chunkY);
    const currentChunk = getChunkCoordinates(
      offset.current.x + offsetX + width / 2,
      offset.current.y + offsetY + depth / 2,
      width
    );

    // console.log("currentChunk:", offset.current.x + offsetX + width / 2, offset.current.y + offsetY + depth / 2);
    useGamaStore.setState({
      currentLocation: { x: currentChunk.chunkX, y: currentChunk.chunkY },
      currentOffset: { x: offset.current.x, y: offset.current.y }
    });

    if (deltaX !== 0 || deltaY !== 0) {
      updateTerrainGeometry();
      updateBeacons(deltaX, deltaY);
      planeRef.current.material.uniforms.offset.value.set(offset.current.x * 0.01, -offset.current.y * 0.01);
    }

  });

  return (
    <group visible={firstStart}>
      <mesh ref={meshRef} geometry={terrainGeometry.current}>
        <meshStandardMaterial wireframe={true} vertexColors side={DoubleSide} />
      </mesh>
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shaderMaterial />
      </mesh>
    </group>
  );
};

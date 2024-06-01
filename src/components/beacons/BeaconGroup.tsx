import { useGameStore } from "../../store/store";
import { BEACONS_RANGE } from "../../store/worldConfig";
import { Cylinder, Sphere } from "@react-three/drei";
import { ConcentricCirclesAnimation } from "../gfx/concentricCircles";
import { useFrame } from "@react-three/fiber";
import { isOutOfBound, useCalculateDeltas } from "../../utils/functions";
import React, { createRef, useMemo } from "react";
import { BufferGeometry, Group, Shape } from "three";
import { useIncreasingSpeed } from "../../effects/IncreaseSceneSpeed";
import { beaconsArmorColors } from "../../store/slices/upgradeStateSlice";

const beaconHeight = 10;

const ShapeCircle = React.memo(function ShapeCircle() {
  const shapePoints = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, BEACONS_RANGE, 0, Math.PI * 2, false);
    const points = shape.getPoints(50);
    return new BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={shapePoints} rotation-x={Math.PI / 2}>
      <lineBasicMaterial color={"#ff0000"} />
    </lineSegments>
  );
});

export const BeaconGroup = () => {
  const firstStart = useGameStore((state) => state.firstStart);
  const beacons = useGameStore((state) => state.beacons);
  const { width, depth, offsetX, offsetY } = useGameStore(
    (state) => state.mapParams,
  );
  const canPlaceBeacon = useGameStore((state) => state.canPlaceBeacon);
  const { deltaX, deltaY } = useCalculateDeltas();

  const beaconRefs = useMemo<React.RefObject<Group>[]>(
    () => beacons.map(() => createRef()),
    [beacons],
  );
  const circleRefs = useMemo<React.RefObject<Group>[]>(
    () => beacons.map(() => createRef()),
    [beacons],
  );

  const { speedRef: increasingSpeedRef } = useIncreasingSpeed(0, 1, 0.01, 2);

  useFrame((_, delta) => {
    beaconRefs.forEach((beaconRef, index) => {
      const beaconObject = beaconRef.current;
      const circleObject = circleRefs[index].current;
      if (beaconObject) {
        const checkBoundaries = isOutOfBound(
          { x: beaconObject.position.x, y: beaconObject.position.z },
          width,
          depth,
          offsetX,
          offsetY,
        );

        beaconObject.position.x -=
          deltaX * (delta * 100) * increasingSpeedRef.current;
        beaconObject.position.z -=
          deltaY * (delta * 100) * increasingSpeedRef.current;
        beaconObject.visible = !checkBoundaries.x && !checkBoundaries.y;
      }

      if (circleObject) {
        circleObject.rotateY(delta / 2);
      }
    });
  });

  return (
    <group visible={firstStart}>
      {beacons.map((beacon, index) => {
        const armorLevel = beacon.armor;
        const armorColor = beaconsArmorColors[armorLevel];
        // const armorSize = 1 + armorLevel * 0.5;

        const collectingLevel = beacon.collectionLevel + 1;

        return (
          <group
            key={beacon.id}
            position={[beacon.x, beacon.y + 1, beacon.z]}
            ref={beaconRefs[index]}
          >
            <Sphere
              args={[1 * collectingLevel, 16, 16]}
              position={[0, beaconHeight * collectingLevel, 0]}
            />
            <Sphere
              args={[collectingLevel * 8, 8, 8]}
              position={[0, beaconHeight / 2 - (collectingLevel - 1) * -5, 0]}
              visible={armorLevel > 0}
            >
              <meshStandardMaterial wireframe color={armorColor} />
            </Sphere>
            <Cylinder
              args={[
                0.1,
                0.1 + (collectingLevel - 1) * 2,
                beaconHeight * collectingLevel,
                8,
              ]}
              position={[0, (beaconHeight / 2) * collectingLevel, 0]}
            />
            <group
              key={"circle_of_" + beacon.id}
              ref={circleRefs[index]}
              visible={canPlaceBeacon}
            >
              <ShapeCircle />
            </group>
            <ConcentricCirclesAnimation size={5 * (collectingLevel / 1.3)} />
          </group>
        );
      })}
    </group>
  );
};

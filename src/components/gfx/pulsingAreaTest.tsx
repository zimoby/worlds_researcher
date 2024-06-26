import { shaderMaterial } from "@react-three/drei";
import { Object3DNode, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { useGameStore } from "../../store/store";

interface PulsingShaderMaterialUniforms {
  uTime: number;
  uColor: Color;
  uFrequency: number;
  uAmplitude: number;
  uOpacity: number;
}

const PulsingShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0x0000ff),
    uFrequency: 10,
    uAmplitude: 0.5,
    uOpacity: 0.5,
    transparent: true,
    side: DoubleSide,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      float value = sin(uTime * uFrequency) * uAmplitude + 0.5;
      gl_FragColor = vec4(uColor, value * uOpacity);
    }
  `,
);

extend({ PulsingShaderMaterial });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      pulsingShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof PulsingShaderMaterial
      > &
        PulsingShaderMaterialUniforms;
    }
  }
}

type PulsingShaderMaterialImpl = ShaderMaterial & {
  uniforms: Record<string, { value: unknown }>;
};

export const PlaneTest = ({
  position = [0, 0, 0],
  color = new Color(0x0000ff),
}) => {
  const ref = useRef<Mesh<PlaneGeometry, PulsingShaderMaterialImpl>>(null);
  const { width, depth } = useGameStore((state) => state.mapParams);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <group position={new Vector3(position[0], position[1], position[2])}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth, 32, 32]} />
        <pulsingShaderMaterial
          uTime={0}
          uColor={color}
          uFrequency={5}
          uAmplitude={0.1}
          uOpacity={0.01}
        />
      </mesh>
    </group>
  );
};

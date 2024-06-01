import { Raycaster, Mesh, Camera, Vector2 } from "three";

export const getIntersection = (
  event: { clientX: number; clientY: number },
  raycaster: Raycaster,
  mesh: Mesh | null,
  camera: Camera,
) => {
  if (!event || !mesh) return [];

  const mouse = new Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObject(mesh);
};

export const keyToVector: Record<string, { x: number; y: number }> = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 },
};

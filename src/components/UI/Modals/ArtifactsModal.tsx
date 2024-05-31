import { useMemo, useState } from "react";
import { useGameStore } from "../../../store/store";
import { ModalWrapper } from "./templateComponents";

export const ArtefactsModal = () => {
  const artifactsArray = useGameStore((state) => state.artifactsArray);
  const visitedWorlds = useGameStore((state) => state.visitedWorlds);
  const [expandedArtifacts, setExpandedArtifacts] = useState<number[]>([]);

  const displayArtifactData = useMemo(() => {
    const worldSeeds = visitedWorlds.map((world) => world.seed.value);

    const filteredSeeds = worldSeeds.filter((seed) =>
      artifactsArray.some((artifact) => artifact.worldId === seed),
    );

    const artifactsInWorld = filteredSeeds.map((seed) => {
      return artifactsArray.filter((artifact) => artifact.worldId === seed);
    });

    return artifactsInWorld;
  }, [artifactsArray, visitedWorlds]);

  const toggleArtifact = (index: number) => {
    if (expandedArtifacts.includes(index)) {
      setExpandedArtifacts(expandedArtifacts.filter((i) => i !== index));
    } else {
      setExpandedArtifacts([...expandedArtifacts, index]);
    }
  };

  return (
    <ModalWrapper
      title={`Artifacts (${displayArtifactData.length})`}
      modalName={`showArtifactsModal`}
    >
      <div className="scrollbar w-full h-full flex flex-col p-7 pt-4 text-uitext leading-5 space-y-1">
        {displayArtifactData.map((world, seed) => (
          <div className="text-xs space-y-1 mb-3" key={seed}>
            <div className="orbitron uppercase text-lg">{`World: ${visitedWorlds[seed].seed.value}`}</div>
            {world.map((artifact, index) => (
              <div
                className="px-2 border border-uilines hover:bg-uilines hover:text-neutral-900"
                key={index}
              >
                <div
                  className={`checked:border-indigo-500 flex items-center justify-between uppercase text-base cursor-pointer select-none`}
                  onClick={() => toggleArtifact(index)}
                >
                  <div className=" leading-5 py-1">{artifact.name}</div>
                  <div>{artifact.type}</div>
                </div>
                {expandedArtifacts.includes(index) && (
                  <>
                    {Object.keys(artifact.params).map((key, index) => (
                      <div className="text-xs" key={index}>
                        {artifact.params[key].name}:{" "}
                        {artifact.params[key].value}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

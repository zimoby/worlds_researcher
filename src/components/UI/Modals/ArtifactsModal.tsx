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
      <div className="scrollbar flex size-full flex-col space-y-1 p-7 pt-4 leading-5 text-uitext">
        {displayArtifactData.map((world, seed) => (
          <div className="mb-3 space-y-1 text-xs" key={seed}>
            <div className="orbitron text-lg uppercase">{`World: ${visitedWorlds[seed].seed.value}`}</div>
            {world.map((artifact, index) => (
              <div
                className="border border-uilines px-2 hover:bg-uilines hover:text-neutral-900"
                key={index}
              >
                <div
                  className={`flex cursor-pointer select-none items-center justify-between text-base uppercase checked:border-indigo-500`}
                  onClick={() => toggleArtifact(index)}
                >
                  <div className=" py-1 leading-5">{artifact.name}</div>
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

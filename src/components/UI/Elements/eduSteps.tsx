import { useCallback } from "react";
import { educationalStepsPhrases } from "../../drone/educationalStepsPhrases";
import { useGameStore } from "../../../store/store";
import { SETTING_EDUCATION_MODE } from "../../../store/constants/appConstants";

export const EducationSteps = () => {
  const educationMode = useGameStore((state) => state.educationMode);
  const educationalStepIndex = useGameStore(
    (state) => state.educationalStepIndex,
  );
  const updateVariableInLocalStorage = useGameStore(
    (state) => state.updateVariableInLocalStorage,
  );
  const resetPanelsOpacity = useGameStore((state) => state.resetPanelsOpacity);

  const currentEduStep = educationalStepsPhrases[educationalStepIndex].step;

  const eduStepsNames = [
    { name: "Welcome", id: "welcome1", startIndex: 0 },
    { name: "Gather resources", id: "resources1", startIndex: 1 },
    { name: "Collect Energy", id: "energy1", startIndex: 5 },
    { name: "Map movement", id: "mapmove1", startIndex: 8 },
    { name: "Artifacts", id: "artifacts1", startIndex: 10 },
  ];

  const changeEduIndex = useCallback(
    (index = 0) => {
      updateVariableInLocalStorage(SETTING_EDUCATION_MODE, true);
      useGameStore.setState({
        educationMode: true,
        educationalStepIndex: index,
      });
    },
    [updateVariableInLocalStorage],
  );

  const finishTutorial = useCallback(() => {
    updateVariableInLocalStorage(SETTING_EDUCATION_MODE, false);
    useGameStore.setState({ educationMode: false, educationalStepIndex: 0 });
    resetPanelsOpacity();
  }, [resetPanelsOpacity, updateVariableInLocalStorage]);

  return (
    <div className="flex flex-col">
      {educationMode && (
        <>
          <div>
            <p className=" orbitron text-uitext">Tutor Steps:</p>
          </div>
          <div className="flex w-44 flex-col items-start justify-center space-y-1">
            {eduStepsNames.map((step, index) => (
              <div
                key={step.id}
                className={`flex w-full cursor-pointer flex-row border-l-8 border-l-uilines px-2 hover:bg-uilines hover:text-neutral-900 ${currentEduStep === index ? "bg-uilines text-neutral-900 " : " border border-uilines text-uitext"}`}
                onClick={() => changeEduIndex(step.startIndex)}
              >
                {currentEduStep === index && (
                  <p className=" mr-2 text-xs"> {"→"} </p>
                )}
                <p className=" text-xs">{`${index + 1}. ${step.name}`}</p>
              </div>
            ))}
            <div
              className={`mt-2 flex w-fit cursor-pointer flex-row border border-uilines px-2 text-xs text-uitext hover:bg-uilines hover:text-neutral-900`}
              onClick={finishTutorial}
            >
              Skip Tutor
            </div>
          </div>
        </>
      )}
      {!educationMode && (
        <div>
          <button
            className="orbitron cursor-pointer border border-uilines px-2 text-xs uppercase text-uitext hover:bg-uilines hover:text-neutral-900"
            onClick={() => changeEduIndex()}
          >
            Tutorial
          </button>
        </div>
      )}
    </div>
  );
};

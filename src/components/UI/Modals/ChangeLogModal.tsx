import { useState, useEffect } from "react";
import { ModalWrapper } from "./templateComponents";

interface ChangeLogEntry {
  date: string;
  version: string;
  changes: string[];
}

const ChangeLogModal = () => {
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

  useEffect(() => {
    fetch("/changelog.json")
      .then((response) => response.json())
      .then((data: ChangeLogEntry[]) => setChangeLog(data))
      .catch((error) => console.error("Error fetching change log:", error));
  }, []);

  return (
    <ModalWrapper title="Change Log" modalName="showChangeLogModal">
      <div className="p-4 overflow-y-auto">
        {changeLog.map((entry, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">
              {entry.version} - {entry.date}
            </h3>
            <ul className="list-disc list-inside">
              {entry.changes.map((change, idx) => (
                <li key={idx}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default ChangeLogModal;

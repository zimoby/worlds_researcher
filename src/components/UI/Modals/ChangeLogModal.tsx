import { useState, useEffect } from "react";

interface ChangeLogEntry {
  date: string;
  version: string;
  changes: string[];
}

const ChangeLogModal = () => {
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/changelog.json")
      .then((response) => response.json())
      .then((data: ChangeLogEntry[]) => setChangeLog(data))
      .catch((error) => console.error("Error fetching change log:", error));
  }, []);

  return (
    <div>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        History of Changes
      </button>
      {isOpen && (
        <div className="p-4 bg-white border rounded shadow-md max-w-lg mx-auto mt-4">
          <h2 className="text-2xl font-bold mb-4">Change Log</h2>
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
      )}
    </div>
  );
};

export default ChangeLogModal;

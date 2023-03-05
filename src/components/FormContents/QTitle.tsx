import React, { FormEvent } from "react";
interface QTitleProps {
  id: number;
  onChange: ({ id, label }: { id: number; label: string }) => void;
  question: string;
  onClick: () => void;
  onEdit: boolean;
  editedField: number | undefined;
}
function QTitle({
  id,
  onChange,
  onClick,
  onEdit,
  question,
  editedField,
}: QTitleProps) {
  return (
    <div
      key={id}
      className="block bg-white text-sm font-medium capitalize dark:bg-black "
    >
      {onEdit && editedField == id ? (
        <input
          type="text"
          value={question || ""}
          onChange={(e) => onChange({ id, label: e.target.value || "" })}
        />
      ) : (
        <label onClick={onClick}>{question}</label>
      )}
    </div>
  );
}

export default QTitle;

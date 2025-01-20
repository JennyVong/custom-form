"use client";

import { useDrop } from "react-dnd";

interface DropZoneProps {
  index: number;
  onDrop: (item: any, index: number) => void;
  isFinal?: boolean;
  children?: React.ReactNode;
}

function DropZone({ index, onDrop, isFinal, children }: DropZoneProps) {
  const [, drop] = useDrop(() => ({
    accept: ["text", "checkbox", "date", "multiselect"],
    drop: (item) => onDrop(item, index),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: "50px",
        margin: "10px 0",
        border: isFinal ? "2px dashed #e5e7eb" : "2px dashed transparent",
        transition: "background-color 0.2s ease",
        backgroundColor: isFinal ? "#f3f4f6" : "transparent",
        "&:hover": {
          backgroundColor: "#e5e7eb",
        },
      }}
    >
      {children || (isFinal && <span>Drop here to add to the end</span>)}
    </div>
  );
}

export default DropZone;

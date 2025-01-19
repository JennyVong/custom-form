"use client";

import { useDrag } from "react-dnd";
import { Card, Text } from "@mantine/core";

interface DraggableElementProps {
  type: string;
  label: string;
}

function DraggableElement({ type, label }: DraggableElementProps) {
  const [, drag] = useDrag(() => ({
    type,
    item: { type },
  }));

  return (
    <Card
      ref={drag}
      padding="md"
      style={{
        cursor: "grab",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Text weight={500}>{label}</Text>
    </Card>
  );
}

export const TextField = () => (
  <DraggableElement type="text" label="Text Field" />
);
export const Checkbox = () => (
  <DraggableElement type="checkbox" label="Checkbox" />
);
export const DateField = () => (
  <DraggableElement type="date" label="Date Field" />
);

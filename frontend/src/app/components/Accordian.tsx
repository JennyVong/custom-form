import { Accordion } from "@mantine/core";
import DraggableElement from "./Drag/DraggableElement";

function AccordianComponent() {
  const categories = [
    {
      title: "Single Line",
      components: [{ type: "text", label: "Custom Single Line" }],
    },
    {
      title: "Date / Time",
      components: [{ type: "date", label: "Simple Date" }],
    },
    {
      title: "Select",
      components: [
        { type: "checkbox", label: "Custom Checkbox" },
        { type: "multiselect", label: "Custom Multiselect" },
      ],
    },
  ];
  const items = categories.map((item, index) => (
    <Accordion.Item key={index} value={item.title}>
      <Accordion.Control>{item.title}</Accordion.Control>
      <Accordion.Panel>
        {item.components.map((component) => (
          <DraggableElement type={component.type} label={component.label} />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return <Accordion>{items}</Accordion>;
}

export default AccordianComponent;

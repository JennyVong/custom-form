import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { FormFieldType } from "../types/FormFieldTypes";

interface AddOptionsProps {
  field: FormFieldType;
  onSave: (options: string[]) => void;
}

function AddOptions({ field, onSave }: AddOptionsProps) {
  const [options, setOptions] = useState(field.options || []);

  const handleSave = () => {
    onSave(options);
  };

  return (
    <div>
      <TextInput
        value={options.join(", ")}
        label="Options (comma-seperated)"
        onChange={(e) =>
          setOptions(e.target.value.split(",").map((opt) => opt.trim()))
        }
      />
      <Button color="violet" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default AddOptions;

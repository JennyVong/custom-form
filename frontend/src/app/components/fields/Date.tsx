import { useState } from "react";
import { DateInput } from "@mantine/dates";

function DateInputComponent() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DateInput
      value={value}
      onChange={setValue}
      label="Date input"
      placeholder="Date input"
      valueFormat="DD/MM/YYYY"
    />
  );
}

export default DateInputComponent;

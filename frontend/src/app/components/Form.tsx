"use client";
import React, { useEffect, useState } from "react";
import FormApiClient from "../APIClients/FormAPIClient";
import { FormType } from "../types/FormType";

export type FormProps = {
  name: string;
  fields: object;
};

function Form() {
  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchForm() {
      try {
        const data = await FormApiClient.getById(
          "13956572-8637-4139-a95e-e420c77e90f7"
        );
        setForm(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchForm();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {form && <pre>{JSON.stringify(form, null, 2)}</pre>}
    </div>
  );
}

export default Form;

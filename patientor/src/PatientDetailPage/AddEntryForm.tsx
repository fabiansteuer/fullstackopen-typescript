import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import React from "react";
// import { DiagnosisSelection } from "../AddPatientModal/FormField";
// import { useStateValue } from "../state";

interface EntryFormValues {
  description: string;
}

const AddEntryForm: React.FC = () => {
  // const [{ diagnoses }] = useStateValue();

  const initialValues: EntryFormValues = { description: "" };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });

          alert(JSON.stringify(values, null, 2));

          actions.setSubmitting(false);
        }}
      >
        {/* {({ setFieldValue, setFieldTouched }) => { */}
        {/* return ( */}
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxWidth: "400px",
            marginBottom: "160px",
          }}
        >
          <TextField
            id="type"
            label="Type"
            variant="filled"
            defaultValue="Hospital"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField id="description" label="Description" variant="filled" />
          <TextField id="specialist" label="Specialist" variant="filled" />
          <TextField id="date" label="Date" variant="filled" />
          <Typography variant="body1">Discharge</Typography>
          <TextField id="dischargeDate" label="Date" variant="filled" />
          <TextField id="dischargeCriteria" label="Criteria" variant="filled" />
          {/* <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                /> */}
          <button type="submit">Add</button>
        </Form>
        {/* ); */}
        {/* } */}
      </Formik>
    </div>
  );
};

export default AddEntryForm;

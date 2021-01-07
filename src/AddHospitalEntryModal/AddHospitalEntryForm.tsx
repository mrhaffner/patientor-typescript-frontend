import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}



export const AddHospitalEntryEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        discharge: { date: "", criteria: "" },
        type: "Hospital",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.discharge.date) {
            errors.discharge = requiredError;
          }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist Seen"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date of Visit"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria..."
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryEntryForm;

import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}



export const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        sickLeave: { startDate: "", endDate: "" },
        employerName: "",
        type: "OccupationalHealthcare",
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
            <Field
              label="Employer"
              placeholder="Emplyer"
              name="employer"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

export default AddOccupationalHealthcareEntryForm;

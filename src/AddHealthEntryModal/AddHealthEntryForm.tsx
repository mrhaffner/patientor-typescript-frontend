import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, SelectHealthField, HealthOption } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthEntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy"},
    { value: HealthCheckRating.LowRisk, label: "Low Risk"},
    { value: HealthCheckRating.HighRisk, label: "High Risk"},
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk"}
];

export const AddHealthEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        type: "HealthCheck",
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
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />
            <SelectHealthField
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthOptions}
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

export default AddHealthEntryForm;

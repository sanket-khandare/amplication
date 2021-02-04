import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ProjectSelect } from "../project/ProjectSelect";
import { UserSelect } from "../user/UserSelect";
import { Timesheet } from "../api/timesheet/Timesheet";
import { TimesheetCreateInput } from "../api/timesheet/TimesheetCreateInput";

const INITIAL_VALUES = {} as TimesheetCreateInput;

export const CreateTimesheet = (): React.ReactElement => {
  useBreadcrumbs("/timesheets/new", "Create Timesheet");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Timesheet,
    AxiosError,
    TimesheetCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/timesheets", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/timesheets"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TimesheetCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Timesheet"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="date" label="Date" name="date" />
          </div>
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <ProjectSelect label="Project" name="project.id" />
          </div>
          <div>
            <TextField label="Time" name="time" />
          </div>
          <div>
            <UserSelect label="User" name="user.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};

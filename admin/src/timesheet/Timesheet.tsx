import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ProjectSelect } from "../project/ProjectSelect";
import { UserSelect } from "../user/UserSelect";
import { Timesheet as TTimesheet } from "../api/timesheet/Timesheet";
import { TimesheetUpdateInput } from "../api/timesheet/TimesheetUpdateInput";

export const Timesheet = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/timesheets/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTimesheet,
    AxiosError,
    [string, string]
  >(["get-/api/timesheets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/timesheets"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTimesheet, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/timesheets"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//timesheets");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTimesheet, AxiosError, TimesheetUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/timesheets"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: TimesheetUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.time);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["date", "description", "project", "time", "user"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Timesheet"} ${
                  data?.time && data?.time.length ? data.time : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};

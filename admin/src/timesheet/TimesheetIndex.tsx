import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TimesheetList } from "./TimesheetList";
import { CreateTimesheet } from "./CreateTimesheet";
import { Timesheet } from "./Timesheet";

export const TimesheetIndex = (): React.ReactElement => {
  useBreadcrumbs("/timesheets/", "Timesheets");

  return (
    <Switch>
      <PrivateRoute exact path={"/timesheets/"} component={TimesheetList} />
      <PrivateRoute path={"/timesheets/new"} component={CreateTimesheet} />
      <PrivateRoute path={"/timesheets/:id"} component={Timesheet} />
    </Switch>
  );
};

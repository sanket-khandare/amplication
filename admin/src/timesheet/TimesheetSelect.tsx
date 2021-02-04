import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Timesheet } from "../api/timesheet/Timesheet";

type Data = Timesheet[];

type Props = Omit<SelectFieldProps, "options">;

export const TimesheetSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/timesheets",
    async () => {
      const response = await api.get("/api/timesheets");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.time && item.time.length ? item.time : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};

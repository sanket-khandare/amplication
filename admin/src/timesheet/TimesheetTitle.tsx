import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Timesheet } from "../api/timesheet/Timesheet";

type Props = { id: string };

export const TimesheetTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Timesheet,
    AxiosError,
    [string, string]
  >(["get-/api/timesheets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/timesheets"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/timesheets"}/${id}`} className="entity-id">
      {data?.time && data?.time.length ? data.time : data?.id}
    </Link>
  );
};

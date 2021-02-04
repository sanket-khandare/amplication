import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TimesheetWhereInput = {
  createdAt?: Date;
  date?: Date;
  description?: string;
  id?: string;
  project?: ProjectWhereUniqueInput;
  time?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};

import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TimesheetUpdateInput = {
  date?: Date;
  description?: string;
  project?: ProjectWhereUniqueInput;
  time?: string;
  user?: UserWhereUniqueInput;
};

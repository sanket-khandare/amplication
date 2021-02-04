import { ArgsType, Field } from "@nestjs/graphql";
import { TimesheetCreateInput } from "./TimesheetCreateInput";

@ArgsType()
class CreateTimesheetArgs {
  @Field(() => TimesheetCreateInput, { nullable: false })
  data!: TimesheetCreateInput;
}

export { CreateTimesheetArgs };

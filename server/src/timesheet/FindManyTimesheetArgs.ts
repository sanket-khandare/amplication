import { ArgsType, Field } from "@nestjs/graphql";
import { TimesheetWhereInput } from "./TimesheetWhereInput";

@ArgsType()
class FindManyTimesheetArgs {
  @Field(() => TimesheetWhereInput, { nullable: true })
  where?: TimesheetWhereInput;
}

export { FindManyTimesheetArgs };

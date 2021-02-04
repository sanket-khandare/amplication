import { ArgsType, Field } from "@nestjs/graphql";
import { TimesheetWhereUniqueInput } from "./TimesheetWhereUniqueInput";

@ArgsType()
class DeleteTimesheetArgs {
  @Field(() => TimesheetWhereUniqueInput, { nullable: false })
  where!: TimesheetWhereUniqueInput;
}

export { DeleteTimesheetArgs };

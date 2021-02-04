import { ArgsType, Field } from "@nestjs/graphql";
import { TimesheetWhereUniqueInput } from "./TimesheetWhereUniqueInput";
import { TimesheetUpdateInput } from "./TimesheetUpdateInput";

@ArgsType()
class UpdateTimesheetArgs {
  @Field(() => TimesheetWhereUniqueInput, { nullable: false })
  where!: TimesheetWhereUniqueInput;
  @Field(() => TimesheetUpdateInput, { nullable: false })
  data!: TimesheetUpdateInput;
}

export { UpdateTimesheetArgs };

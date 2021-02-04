import { ArgsType, Field } from "@nestjs/graphql";
import { TimesheetWhereUniqueInput } from "./TimesheetWhereUniqueInput";

@ArgsType()
class FindOneTimesheetArgs {
  @Field(() => TimesheetWhereUniqueInput, { nullable: false })
  where!: TimesheetWhereUniqueInput;
}

export { FindOneTimesheetArgs };

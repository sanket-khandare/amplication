import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TimesheetService } from "./timesheet.service";
import { TimesheetController } from "./timesheet.controller";
import { TimesheetResolver } from "./timesheet.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService, TimesheetResolver],
  exports: [TimesheetService],
})
export class TimesheetModule {}

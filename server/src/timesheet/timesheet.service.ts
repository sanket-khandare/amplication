import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTimesheetArgs,
  FindManyTimesheetArgs,
  TimesheetCreateArgs,
  TimesheetUpdateArgs,
  TimesheetDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TimesheetService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTimesheetArgs>(
    args: Subset<T, FindManyTimesheetArgs>
  ) {
    return this.prisma.timesheet.findMany(args);
  }
  findOne<T extends FindOneTimesheetArgs>(
    args: Subset<T, FindOneTimesheetArgs>
  ) {
    return this.prisma.timesheet.findOne(args);
  }
  create<T extends TimesheetCreateArgs>(args: Subset<T, TimesheetCreateArgs>) {
    return this.prisma.timesheet.create<T>(args);
  }
  update<T extends TimesheetUpdateArgs>(args: Subset<T, TimesheetUpdateArgs>) {
    return this.prisma.timesheet.update<T>(args);
  }
  delete<T extends TimesheetDeleteArgs>(args: Subset<T, TimesheetDeleteArgs>) {
    return this.prisma.timesheet.delete(args);
  }
}

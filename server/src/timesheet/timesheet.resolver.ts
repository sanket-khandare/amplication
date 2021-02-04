import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TimesheetService } from "./timesheet.service";
import { CreateTimesheetArgs } from "./CreateTimesheetArgs";
import { UpdateTimesheetArgs } from "./UpdateTimesheetArgs";
import { DeleteTimesheetArgs } from "./DeleteTimesheetArgs";
import { FindManyTimesheetArgs } from "./FindManyTimesheetArgs";
import { FindOneTimesheetArgs } from "./FindOneTimesheetArgs";
import { Timesheet } from "./Timesheet";
import { Project } from "../project/Project";
import { User } from "../user/User";

@graphql.Resolver(() => Timesheet)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TimesheetResolver {
  constructor(
    private readonly service: TimesheetService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Timesheet])
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "any",
  })
  async timesheets(
    @graphql.Args() args: FindManyTimesheetArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Timesheet[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Timesheet",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Timesheet, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "own",
  })
  async timesheet(
    @graphql.Args() args: FindOneTimesheetArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Timesheet | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Timesheet",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Timesheet)
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "create",
    possession: "any",
  })
  async createTimesheet(
    @graphql.Args() args: CreateTimesheetArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Timesheet> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Timesheet",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Timesheet"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        project: {
          connect: args.data.project,
        },

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => Timesheet)
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "update",
    possession: "any",
  })
  async updateTimesheet(
    @graphql.Args() args: UpdateTimesheetArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Timesheet | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Timesheet",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Timesheet"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          project: {
            connect: args.data.project,
          },

          user: {
            connect: args.data.user,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Timesheet)
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "delete",
    possession: "any",
  })
  async deleteTimesheet(
    @graphql.Args() args: DeleteTimesheetArgs
  ): Promise<Timesheet | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Project, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "any",
  })
  async project(
    @graphql.Parent() parent: Timesheet,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Project",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .project();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Timesheet,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .user();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}

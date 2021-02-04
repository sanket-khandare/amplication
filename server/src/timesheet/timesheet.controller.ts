import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { TimesheetService } from "./timesheet.service";
import { TimesheetCreateInput } from "./TimesheetCreateInput";
import { TimesheetWhereInput } from "./TimesheetWhereInput";
import { TimesheetWhereUniqueInput } from "./TimesheetWhereUniqueInput";
import { TimesheetUpdateInput } from "./TimesheetUpdateInput";
import { Timesheet } from "./Timesheet";

@swagger.ApiBasicAuth()
@swagger.ApiTags("timesheets")
@common.Controller("timesheets")
export class TimesheetController {
  constructor(
    private readonly service: TimesheetService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Timesheet })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: TimesheetCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Timesheet> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Timesheet",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Timesheet"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        project: {
          connect: data.project,
        },

        user: {
          connect: data.user,
        },
      },
      select: {
        createdAt: true,
        date: true,
        description: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        time: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Timesheet] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: TimesheetWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Timesheet[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Timesheet",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        date: true,
        description: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        time: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Timesheet })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: TimesheetWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Timesheet | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Timesheet",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        date: true,
        description: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        time: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Timesheet })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: TimesheetWhereUniqueInput,
    @common.Body()
    data: TimesheetUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Timesheet | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Timesheet",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Timesheet"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          project: {
            connect: data.project,
          },

          user: {
            connect: data.user,
          },
        },
        select: {
          createdAt: true,
          date: true,
          description: true,
          id: true,

          project: {
            select: {
              id: true,
            },
          },

          time: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Timesheet",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Timesheet })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: TimesheetWhereUniqueInput
  ): Promise<Timesheet | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          date: true,
          description: true,
          id: true,

          project: {
            select: {
              id: true,
            },
          },

          time: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}

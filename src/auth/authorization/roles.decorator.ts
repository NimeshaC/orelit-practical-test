import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enum";
import { Reflector } from "@nestjs/core";

//Define the metadata key
export const ROLES_KEY = "roles";
//Define the decorator for set metadata
//export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
export const Roles = Reflector.createDecorator<Role[]>();

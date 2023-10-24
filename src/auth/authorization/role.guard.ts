import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Global,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    //Get the roles from the passed as metadata
    const requiredRoles = this.reflector.get(Roles, context.getHandler());

    //If no roles are required, return true
    if (!requiredRoles) {
      return true;
    }

    //Get the user from the request
    const { headers } = context.switchToHttp().getRequest();
    const authorizationHeader = headers.authorization;
    console.log(authorizationHeader);
    const { roleName }: any = this.jwtService.decode(
      authorizationHeader.split(" ")[1]
    );
    console.log(requiredRoles.includes(roleName));

    //If the user has the required role, return true
    return requiredRoles.some((role) => requiredRoles.includes(roleName));
  }
}

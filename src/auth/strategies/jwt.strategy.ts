import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";

//JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //Inject the UserService
  //Pass the options to the PassportStrategy Super Class
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "ORELITPRACTICALTESTJWTSECRET/s",
    });
  }

  //Validate the payload
  async validate(validationPayload: {
    email: string;
    roleName: string;
  }): Promise<User> {
    // const user = new User()

    // user.email = validationPayload.email
    // user.roleName = validationPayload.roleName

    // if (validationPayload.roleName == process.env.ROLE_NAME) {
    //   return user
    // }

    try {
      const user = await this.userService.findOneByEmail(
        validationPayload.email
      );

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

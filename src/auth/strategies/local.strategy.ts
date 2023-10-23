import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

//Local Strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //Inject the AuthService
  //Pass the options to the PassportStrategy Super Class
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  //Validate the payload
  async validate(email: string, password: string): Promise<User> {
    // if (email == process.env.ADMIN_USERNAME) {
    //   if (password == process.env.ADMIN_PASSWORD) {
    //     const admin = new User()
    //     admin.email = email
    //     admin.firstName = process.env.LI_ADMIN_FIRST_NAME
    //     admin.role = process.env.LI_ADMIN_CODE

    //     return admin
    //   } else {
    //     throw new UnauthorizedException('password not valid')
    //   }

    // }

    // const roleString = process.env.LI_ADMIN_CODE

    // const admin = new User()

    // admin.email = email
    // admin.password = password
    // admin.role = Number(roleString)

    // console.log(email + "process.env.ADMIN_USERNAME", process.env.ADMIN_USERNAME);
    // console.log(password + "process.env.ADMIN_PASSWORD", process.env.ADMIN_PASSWORD);
    // console.log(admin.role)

    // if (email == process.env.ADMIN_USERNAME || password == process.env.ADMIN_PASSWORD) {
    //   return admin
    // }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

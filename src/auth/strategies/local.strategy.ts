import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SignInService } from '../services/signin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private signInService: SignInService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.signInService.validateUser(
      email.toLowerCase(),
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.verified) {
      throw new UnauthorizedException('User not verified');
    }

    return user;
  }
}

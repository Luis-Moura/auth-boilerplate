import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ISignIn } from './models/signIn.interface';
import { EmailsService } from 'src/emails/emails.service';
import { IFindByEmail } from 'src/users/models/findByEmail.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailsService,
  ) {}

  async signUp(createUserDto: UserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      verified: false,
    });

    const token = this.jwtService.sign(
      { sub: newUser.id },
      { expiresIn: '15m' },
    );
    await this.usersRepository.save(newUser);

    await this.emailService.sendVerificationEmail(newUser.email, token);

    return {
      message:
        'User registered successfully. Please check your email for verification instructions.',
    };
  }

  async verifyEmail(token: string) {
    const decoded: IFindByEmail = this.jwtService.verify(token);
    const user = await this.usersService.findByEmailUtil(decoded.email);

    if (!user) {
      throw new ConflictException('User not found');
    }

    user.verified = true;
    await this.usersRepository.save(user);
  }

  async signIn(data: ISignIn) {
    const user = await this.usersService.findByEmailUtil(data.email);

    if (!user.verified) {
      throw new ConflictException('User not verified');
    }

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (isPasswordMatch) {
        const payload = { sub: user.id, email: user.email, name: user.name };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }

    throw new ConflictException('Invalid credentials');
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmailUtil(email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    return null;
  }
}

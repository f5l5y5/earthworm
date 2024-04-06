import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import axios from 'axios';
import { CreateUserDto } from '../user/model/user.dto';
import { UserService } from '../user/user.service';
import { GithubCodeDto, SignDto } from './model/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getToken(dto: GithubCodeDto) {
    const code = dto.code;
    const clientID = 'b08c95e85b02e09ba9a6';
    const clientSecret = '6d05f714cf3339f3873f07caef1b32c9430ca2ba';
    const tokenRes = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      headers: { accept: 'application/json' },
    });
    console.log('打印***res', tokenRes.data);
    const userInfo = await axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {
        Authorization: `token ${tokenRes.data.access_token}`,
      },
    });

    console.log('打印***userInfo', userInfo.data);

    return {
      token: 111,
      user: 'admin',
    };
  }

  async login(dto: SignDto) {
    const user = await this.userService.findWithPhone(dto);
    if (!user) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.name, phone: user.phone };
    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async signup(dto: CreateUserDto) {
    const user = await this.userService.findWithPhone(dto);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const res = await this.userService.createUser(dto);
    const payload = { userId: res.id, username: dto.name };
    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        ...payload,
        phone: dto.phone,
      },
    };
  }
}

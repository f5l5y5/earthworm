import '@nestjs/common';
import { PickType } from '@nestjs/swagger';
import { CreateGithubCodeDto, CreateUserDto } from '../../user/model/user.dto';

export class SignDto extends PickType(CreateUserDto, ['phone', 'password']) {}
export class GithubCodeDto extends PickType(CreateGithubCodeDto, ['code']) {}

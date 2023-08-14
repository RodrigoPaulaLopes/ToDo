import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { EncryptService } from 'src/encrypt/encrypt.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly enc: EncryptService,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      const user: User = {
        ...createUserDto,
        password: this.enc.encrypt(createUserDto.password),
      };

      return this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async signin(signin: SignInDto) {
    try {
      const user: User = await this.usersRepository.findOne({
        where: { username: signin.username },
      });

      if (!user) {
        throw new NotFoundException('User or password are wrong!');
      } else {
        const isEqual = await this.enc.compare(signin.password, user.password);
        if (!isEqual) {
          throw new NotFoundException('User or password are wrong!');
        } else {
          const payload = { sub: user.id, username: user.username };
          return { token: this.jwtService.sign(payload) };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  findOne(id: number) {
    try {
      if (id == null) throw new BadRequestException('id cant be null');

      return this.usersRepository.findOne({ where: { id: id } });
    } catch (error) {}
  }

  update(updateUserDto: UpdateUserDto) {
    try {
      updateUserDto.password = this.enc.encrypt(updateUserDto.password);
      return this.usersRepository.update(updateUserDto.id, updateUserDto);
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

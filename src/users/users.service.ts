import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService){}

 async create(createUserDto: CreateUserDto) {
    const hashedPassw = await hash(createUserDto.password);
    const newUser =  await  this.db.user.create({
      data:{
        ...createUserDto,
        password: hashedPassw,
      }
    })

    delete newUser.password;
    return newUser;
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(email: string) {
    return this.db.user.findUniqueOrThrow({
      where:{
        email: email
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService, private userService: UsersService){}

async  login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email)

    if(await verify(user.password, loginDto.password)){
       return this.db.token.create({
            data:{
                token: crypto.randomBytes(32).toString('hex'),
                user: {connect:{id: user.id}},
                
            }
        })
    }else{
        throw new Error()
    }

    
  }
  
  /* async me(){
    
  } */
}


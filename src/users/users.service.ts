import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Users.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string, admin: boolean) {
    console.log(admin);
    const user = this.repo.create({ email, password, admin });
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
}

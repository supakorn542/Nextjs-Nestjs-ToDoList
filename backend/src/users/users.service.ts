import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ withDeleted: false });
  }

  async findOneByEmail(email: string): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { email },
      withDeleted: false,
    });
    if (!userData) {
      throw new NotFoundException(`User not found`);
    }
    return userData;
  }

  async findOne(id: number): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
    });
    if (!userData) {
      throw new NotFoundException(`User not found`);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.deletedAt) {
      throw new NotFoundException(`User with ID ${id} has been deleted`);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}

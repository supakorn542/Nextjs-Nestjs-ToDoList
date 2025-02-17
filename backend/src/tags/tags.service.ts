import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {

  constructor(
    private userService : UsersService,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ){}

  async create(createTagDto: CreateTagDto) : Promise<Tag> {
    const { name, user } = createTagDto;


    const userEntity = await this.userService.findOne(user);  
    if (!userEntity) throw new NotFoundException('User not found');

 
    const tag = this.tagRepository.create({
      name,
      user: userEntity, 
    });

    return this.tagRepository.save(tag); 
  }

  async findAll() : Promise<Tag[]> {
    return this.tagRepository.find({ withDeleted: false });
  }

  async findByIds(tagIds: number[]): Promise<Tag[]> {
    return this.tagRepository.find({ where: { id: In(tagIds) } });
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}

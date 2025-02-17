import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';
import { Task } from './entities/task.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class TasksService {

  constructor(
    private readonly userService: UsersService,
    private readonly tagService: TagsService,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto);
  
  
    const user = await this.userService.findOne(createTaskDto.userId);
    if (!user) throw new Error('User not found');
  
 
    let tags: Tag[] = [];
    if (createTaskDto.tagIds && createTaskDto.tagIds.length > 0) {
      tags = await this.tagService.findByIds(createTaskDto.tagIds);
    }
  

    let task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      dueDate: createTaskDto.dueDate,
      user: user,
      tags: tags, 
    });
  
   
  
 
    return this.taskRepository.save(task);
  }
  
  
  async findByIds(ids: number[]): Promise<Task[]> {
    return this.taskRepository.findByIds(ids);  
  }

  findAll() {
    return this.taskRepository.find({ withDeleted: false});
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

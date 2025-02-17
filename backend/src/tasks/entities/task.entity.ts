import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity'
import { Tag } from '../../tags/entities/tag.entity'

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true})
  description?: string;

  @Column({ type: 'enum', enum: ['To Do','In Progress','Completed'], default: 'To Do'})
  status: 'To Do' | 'In Progress' | 'Completed' ;

  @Column({nullable:true, type: 'timestamp'})
  dueDate?: Date;

  @ManyToOne(() => User,(user) => user.tasks, { onDelete : 'CASCADE'})
  user: User;

  @ManyToMany(() => Tag, tag => tag.tasks, { cascade: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
  })
  tags: Tag[];



}

import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, ManyToOne  } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Task } from '../../tasks/entities/task.entity'

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.tags , { onDelete: 'CASCADE'})
    user: User;

    @ManyToMany(() => Task, task => task.tags)
    tasks: Task[];


}

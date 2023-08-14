import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public name: string;
  @Column()
  public email: string;
  @Column()
  public username: string;
  @Column()
  public password: string;

  @OneToMany(() => Task, (task) => task.user)
  public tasks?: Task[];
}

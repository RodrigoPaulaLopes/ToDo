import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private title: string;
  @Column()
  private description: string;
  @Column()
  private initialDate: Date;
  @Column()
  private finishedDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  public user: User;
}

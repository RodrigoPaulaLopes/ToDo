import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { EncryptModule } from './encrypt/encrypt.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TaskModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'todolist',
      entities: [User, Task],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'rodrigo',
      signOptions: { expiresIn: '60s' },
    }),
    EncryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

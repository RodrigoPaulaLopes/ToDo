import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class EncryptService {
  encrypt(password: string) {
    return hashSync(password, 10);
  }

  public compare(password: string, encrptPass: string) {
    return compare(password, encrptPass);
  }
}

import { Injectable } from '@nestjs/common';
import { HashingService } from '../services/hashing.service';
import { hash, verify } from 'argon2';
@Injectable()
export class ArgonHashing implements HashingService {
  async compare(hash: string, plain: string | Buffer): Promise<boolean> {
    return verify(hash, plain);
  }

  async hash(password: string | Buffer): Promise<string> {
    return hash(password);
  }
}

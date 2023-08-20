import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(password: string | Buffer): Promise<string>;
  abstract compare(plain: string | Buffer, hash: string): Promise<boolean>;
}

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(password: string | Buffer): Promise<string>;
  abstract compare(hash: string, plain: string | Buffer): Promise<boolean>;
}

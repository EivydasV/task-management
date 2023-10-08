import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class BaseEncryption {
  createRandomToken(length: number = 64): string {
    return nanoid(length);
  }
}

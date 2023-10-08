import { Module } from '@nestjs/common';
import { HashingService } from './services/hashing.service';
import { ArgonHashing } from './hasing/argon.hashing';
import { BaseEncryption } from './encryption/base.encryption';

@Module({
  providers: [
    BaseEncryption,

    {
      provide: HashingService,
      useClass: ArgonHashing,
    },
  ],
  exports: [HashingService, BaseEncryption],
})
export class CryptoModule {}

import { Global, Module } from '@nestjs/common';

import { databaseSourceMain } from './database.providers';

@Global()
@Module({
  providers: [databaseSourceMain],
  exports: [databaseSourceMain],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';

import { ColorsCRUDService } from './colors-crud.service';
import { ColorsCRUDResolver } from './colors-crud.resolver';

@Module({})
export class ColorsModule {
  public static forRoot() {
    return {
      module: ColorsModule,
      providers: [ColorsCRUDService, ColorsCRUDResolver],
      exports: [],
    };
  }
}

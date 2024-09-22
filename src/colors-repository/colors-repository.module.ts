import { DynamicModule, Module } from '@nestjs/common';

import * as Devflags from 'src/app.develop-flags';

import { ColorsRepositoryService } from './colors-repository.service';
import { ColorsRepositoryMockService } from './colors-repository-mock.service';

import {
  TOKEN_TYPEORM_COLORS_REPOSITORY,
  typeormColorsRepositoryProvider,
} from './colors.entity';

@Module({})
export class ColorsRepositoryModule {
  public static forRoot(props: {}): DynamicModule {
    if (Devflags.DEVFLAG_USE_MOCK_COLORS) {
      return ColorsRepositoryModule.forMock();
    }
    return ColorsRepositoryModule.forProd();
  }

  private static forProd(): DynamicModule {
    return {
      module: ColorsRepositoryModule,
      global: true,
      providers: [ColorsRepositoryService, typeormColorsRepositoryProvider],
      exports: [ColorsRepositoryService],
    };
  }

  private static forMock(): DynamicModule {
    return {
      module: ColorsRepositoryModule,
      global: true,
      providers: [
        {
          provide: ColorsRepositoryService,
          useClass: ColorsRepositoryMockService,
        },
      ],
      exports: [ColorsRepositoryService],
    };
  }
}

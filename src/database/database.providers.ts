import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { TOKEN_DATASOURCE_MAIN } from './tokens';

export const databaseSourceMain = {
  provide: TOKEN_DATASOURCE_MAIN,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const datasourceUrl = configService.getOrThrow<string>('DATABASE_URL');

    const dataSource = new DataSource({
      type: 'postgres',
      url: datasourceUrl,
      entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    });

    return dataSource.initialize();
  },
};

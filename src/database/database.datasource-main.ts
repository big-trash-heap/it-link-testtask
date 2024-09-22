import { join } from 'path';
import { DataSource } from 'typeorm';

/// Для typeorm cli
/// TODO: подумать как можно убрать и унифицировать (не очень важно)

export const DataSourceMain = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/../../migrations/*{.ts,.js}')],
});

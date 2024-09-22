import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
  Repository,
} from 'typeorm';

import { DATASOURCE_MAIN } from '../database';

@Entity({
  name: 'colors',
})
export class ColorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: true })
  c_name: string;

  @Column({ length: 16, nullable: true })
  c_hex: string;
}

export const TOKEN_TYPEORM_COLORS_REPOSITORY = Symbol(
  'TOKEN_TYPEORM_COLORS_REPOSITORY',
);

export const typeormColorsRepositoryProvider = {
  provide: TOKEN_TYPEORM_COLORS_REPOSITORY,
  useFactory: (dataSource: DataSource) => {
    return dataSource.getRepository(ColorsEntity);
  },
  inject: [DATASOURCE_MAIN],
};

export type TypeormColorsRepositoryProvider = Repository<ColorsEntity>;

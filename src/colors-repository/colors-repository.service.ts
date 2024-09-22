import { Inject, Injectable } from '@nestjs/common';

import { IPagination } from 'src/types';
import { EntityRepositoryNotFoundError } from 'src/exceptions';

import { IColorsRepository } from './types';
import {
  TOKEN_TYPEORM_COLORS_REPOSITORY,
  TypeormColorsRepositoryProvider,
} from './colors.entity';
import { RGBAColorVODeserializator } from './rgba-color.vo';

@Injectable()
export class ColorsRepositoryService implements IColorsRepository.Interface {
  public constructor(
    @Inject(TOKEN_TYPEORM_COLORS_REPOSITORY)
    private readonly typeormColorsRepository: TypeormColorsRepositoryProvider,
  ) {}

  public async create(
    props: IColorsRepository.CreateProps,
  ): Promise<IColorsRepository.Entity> {
    const entity = this.typeormColorsRepository.create({
      c_name: props.name,
      c_hex: props.colorHex.serialize(),
    });

    await this.typeormColorsRepository.insert(entity);

    return {
      id: entity.id,
      name: entity.c_name,
      colorHex: new RGBAColorVODeserializator(entity.c_hex),
    };
  }

  public async findFirstByName(
    props: IColorsRepository.FindByNameProps,
  ): Promise<IColorsRepository.Entity> {
    const entity = await this.typeormColorsRepository
      .createQueryBuilder('color')
      .where('LOWER(color.c_name) = :name', {
        name: props.caselessName.toLowerCase(),
      })
      .getOne();

    if (!entity) {
      throw new EntityRepositoryNotFoundError(
        `Color ${props.caselessName} not found`,
      );
    }

    return {
      id: entity.id,
      name: entity.c_name,
      colorHex: new RGBAColorVODeserializator(entity.c_hex),
    };
  }

  public async findAll(): Promise<IColorsRepository.Entity[]> {
    const entities = await this.typeormColorsRepository.find();
    return entities.map((entity) => ({
      id: entity.id,
      name: entity.c_name,
      colorHex: new RGBAColorVODeserializator(entity.c_hex),
    }));
  }

  public async findAllWithPagination(
    props: IColorsRepository.FindAllWithPaginationProps,
  ): Promise<IPagination<IColorsRepository.Entity>> {
    const { page, limit } = props;

    const perPage = Math.max(1, Math.trunc(limit));
    const currentPage = Math.max(1, Math.trunc(page));

    const [values, total] = await this.typeormColorsRepository
      .createQueryBuilder('color')
      .skip((currentPage - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    const lastPage = Math.ceil(total / perPage);

    const items = values.map((entity) => ({
      id: entity.id,
      name: entity.c_name,
      colorHex: new RGBAColorVODeserializator(entity.c_hex),
    }));

    return {
      items,
      total,
      perPage,
      currentPage,
      lastPage,
    };
  }
}

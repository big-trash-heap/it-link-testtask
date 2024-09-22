import { Inject, Injectable } from '@nestjs/common';

import {
  ColorsRepositoryService,
  IColorsRepository,
  RGBAColorVO,
} from 'src/colors-repository';

import { ColorsCRUDEntity } from './types';

@Injectable()
export class ColorsCRUDService {
  public constructor(
    @Inject(ColorsRepositoryService)
    private readonly colorsRepository: IColorsRepository.Interface,
  ) {}

  public async create(props: { name: string; colorHex: string }) {
    const entity = await this.colorsRepository.create({
      name: props.name,
      colorHex: RGBAColorVO.fromHexString(props.colorHex),
    });

    return this.entitySerialize(entity);
  }

  public async findAll() {
    const entities = await this.colorsRepository.findAll();
    return entities.map((entity) => this.entitySerialize(entity));
  }

  public async findAllWithPagination(props: { page: number }) {
    const entities = await this.colorsRepository.findAllWithPagination({
      page: props.page,
      limit: 5,
    });

    const { items, ...pagination } = entities;

    return {
      items: items.map((entity) => this.entitySerialize(entity)),
      ...pagination,
    };
  }

  public async findFirstByName(props: { caselessName: string }) {
    const entity = await this.colorsRepository.findFirstByName({
      caselessName: props.caselessName,
    });
    return this.entitySerialize(entity);
  }

  private entitySerialize(entity: IColorsRepository.Entity): ColorsCRUDEntity {
    const data = {} as ColorsCRUDEntity;

    const colorHex = entity.colorHex?.safeDeserialize();

    data.id = entity.id;
    data.name = entity.name;

    if (colorHex?.valid) {
      data.colorHex = colorHex.data.colorRGBHex;
      data.colorCss = colorHex.data.colorRGBCss;
    } else {
      data.colorHex = null;
      data.colorCss = null;
    }

    return data;
  }
}

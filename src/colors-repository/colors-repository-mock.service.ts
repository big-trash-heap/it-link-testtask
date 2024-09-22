import { Injectable } from '@nestjs/common';

import { IPagination } from 'src/types';
import { EntityRepositoryNotFoundError } from 'src/exceptions';

import { IColorsRepository } from './types';
import { RGBAColorVODeserializator } from './rgba-color.vo';

@Injectable()
export class ColorsRepositoryMockService
  implements IColorsRepository.Interface
{
  private counter = 1;
  private store = new Map<
    number,
    {
      id: number;
      name: null | string;
      colorHex: null | any;
    }
  >();

  public async create(
    props: IColorsRepository.CreateProps,
  ): Promise<IColorsRepository.Entity> {
    const { name, colorHex } = props;
    const id = this.counter++;

    const cell = {
      id,
      name,
      colorHex: colorHex.serialize(),
    };

    this.store.set(id, cell);

    return {
      id,
      name,
      colorHex: new RGBAColorVODeserializator(cell.colorHex),
    };
  }

  public async findFirstByName(
    props: IColorsRepository.FindByNameProps,
  ): Promise<IColorsRepository.Entity> {
    const { caselessName } = props;

    for (const [id, cell] of this.store) {
      if (cell.name === null) {
        continue;
      }

      if (cell.name.toLowerCase() === caselessName.toLowerCase()) {
        return {
          id,
          name: cell.name,
          colorHex: new RGBAColorVODeserializator(cell.colorHex),
        };
      }
    }

    throw new EntityRepositoryNotFoundError(
      `Color by name ${caselessName} not found`,
    );
  }

  public async findAll(): Promise<IColorsRepository.Entity[]> {
    return [...this.store.values()].map((cell) => {
      return {
        id: cell.id,
        name: cell.name,
        colorHex: new RGBAColorVODeserializator(cell.colorHex),
      };
    });
  }

  public async findAllWithPagination(
    props: IColorsRepository.FindAllWithPaginationProps,
  ): Promise<IPagination<IColorsRepository.Entity>> {
    const { page, limit } = props;

    const total = this.store.size;
    const perPage = Math.max(1, Math.trunc(limit));
    const currentPage = Math.max(1, Math.trunc(page));
    const lastPage = Math.ceil(total / perPage);

    const items = await this.findAll();

    return {
      items: items.slice((currentPage - 1) * perPage, currentPage * perPage),
      total,
      perPage,
      currentPage,
      lastPage,
    };
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  Color,
  CreateColorProps,
  FindAllColorsWithPaginationProps,
  FindColorByNameProps,
} from 'src/graphql';

import { IResolver } from './types';
import { ColorsCRUDService } from './colors-crud.service';

@Resolver('Color')
export class ColorsCRUDResolver implements IResolver {
  constructor(private readonly colorsCRUDService: ColorsCRUDService) {}

  @Mutation()
  public async createColor(
    @Args('props') props: CreateColorProps,
  ): Promise<Color> {
    const color = await this.colorsCRUDService.create({
      name: props.name,
      colorHex: props.colorHex,
    });

    return color;
  }

  @Query()
  public async findColorByName(
    @Args('props') props: FindColorByNameProps,
  ): Promise<Color> {
    const color = await this.colorsCRUDService.findFirstByName({
      caselessName: props.caselessName,
    });

    return color;
  }

  @Query()
  public async findAllColors(): Promise<Color[]> {
    const colors = await this.colorsCRUDService.findAll();
    return colors;
  }

  @Query()
  public async findAllColorsWithPagination(
    @Args('props') props: FindAllColorsWithPaginationProps,
  ): Promise<Color[]> {
    const colors = await this.colorsCRUDService.findAllWithPagination({
      page: props.page,
    });

    return colors.items;
  }
}

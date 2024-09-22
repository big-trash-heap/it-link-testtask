import { IDeserialization, IPagination } from 'src/types';
import { RGBAColorVO } from './rgba-color.vo';

export namespace IColorsRepository {
  export type Entity = {
    id: number;
    name: null | string;
    colorHex: null | IDeserialization<RGBAColorVO>;
  };

  export type CreateProps = {
    name: string;
    colorHex: RGBAColorVO;
  };

  export type FindAllWithPaginationProps = {
    page: number;
    limit: number;
  };

  export type FindByNameProps = {
    caselessName: string;
  };

  export type Interface = {
    create(props: CreateProps): Promise<Entity>;
    findFirstByName(props: FindByNameProps): Promise<Entity>;
    findAll(): Promise<Entity[]>;
    findAllWithPagination(
      props: FindAllWithPaginationProps,
    ): Promise<IPagination<Entity>>;
  };
}

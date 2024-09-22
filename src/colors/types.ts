import { IMutation, IQuery } from 'src/graphql';

export type IResolver = Pick<IMutation, 'createColor'> &
  Pick<
    IQuery,
    | 'findColorByName'
    | 'findAllColors'
    | 'findAllColors'
    | 'findAllColorsWithPagination'
  >;

export type ColorsCRUDEntity = {
  id: number;
  name: null | string;
  colorHex: null | string;
  colorCss: null | string;
};

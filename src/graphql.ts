
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface FindColorByNameProps {
    caselessName: string;
}

export interface FindAllColorsWithPaginationProps {
    page: number;
}

export interface CreateColorProps {
    name: string;
    colorHex: string;
}

export interface Color {
    id: number;
    name?: Nullable<string>;
    colorHex?: Nullable<string>;
    colorCss?: Nullable<string>;
}

export interface IQuery {
    findColorByName(props: FindColorByNameProps): Color | Promise<Color>;
    findAllColors(): Color[] | Promise<Color[]>;
    findAllColorsWithPagination(props: FindAllColorsWithPaginationProps): Color[] | Promise<Color[]>;
}

export interface IMutation {
    createColor(props: CreateColorProps): Color | Promise<Color>;
}

type Nullable<T> = T | null;

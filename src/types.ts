export type IPagination<M> = {
  items: M[];
  total: number;
  /** starting from 1 */
  currentPage: number;
  perPage: number;
  lastPage: number;
};

export type ISerialization<S extends string | number = any> = {
  serialize(): S;
};

export type IDeserialization<E> = {
  deserialize(): E;
  safeDeserialize():
    | { valid: true; data: E }
    | { valid: false; error: Error; data: any };
};

export interface WooResponse<T> {
  data: T;
  meta: {
    page?: number;
    total: number;
    totalPage: number;
  };
}

export interface WooMetadata {
  id: number;
  key: string;
  value: string;
}

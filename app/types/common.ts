export interface WooResponse<T> {
  data: T;
}

export interface WooMetadata {
  id: number;
  key: string;
  value: string;
}

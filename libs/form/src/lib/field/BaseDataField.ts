import { ReactNode } from 'react';
import { AnySchema } from 'yup';

// The base form data field
export interface IBaseDataField<T> {
  key: keyof T; // Field key
  formLabel: string; // Field label on form
  uiProps?: object;
  gridProps?: object;
  validation?: AnySchema;
  prefix?: ReactNode; // e.g: $
  suffix?: ReactNode; // e.g: Kg
  onAddClick?: (value?: string) => void; // Function to add a new related entity
  onChange?: (value: string | null) => void;
}

export type getData<U> = (searchText?: string) => U[];
export type getDataPromise<U> = (searchText?: string) => Promise<U[]>;

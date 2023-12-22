import { IBaseDataField } from './BaseDataField';

export interface ICustomField<T> extends IBaseDataField<T> {
  formType: 'custom';
}

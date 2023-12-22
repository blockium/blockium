import { IColorField } from './ColorField';
import { ICustomField } from './CustomField';
import { IDateTimeField } from './DateTimeField';
import { INumberField } from './NumberField';
import { ISelectField } from './SelectField';
import { ISelectSearchAsyncField } from './SelectSearchAsyncField';
import { ISwitchField } from './SwitchField';
import { ITextField } from './TextField';

// Metadata to define a form data field
export type FormField<T> =
  | ITextField<T>
  | ISelectField<T>
  | ISelectSearchAsyncField<T>
  | INumberField<T>
  | IDateTimeField<T>
  | ISwitchField<T>
  | IColorField<T>
  | ICustomField<T>;

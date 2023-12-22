import { ReactNode } from 'react';

// mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

// custom hooks
import { useIsMobile } from '../hooks/useIsMobile';

import { Form } from '../form/Form';
import { IForm, useForm } from '../form/useForm';
import { FormField } from '../field';

export type FormDialogAction = (form: IForm) => ReactNode;

// Props for a form dialog that creates the components from fields metadata
type FormDialogProps<T> = {
  open: boolean;
  title: string;
  message?: string;
  data: T;
  fields: FormField<T>[];
  gridProps?: object;
  onSubmit: () => void;
  onClose: () => void;
  leftActions?: FormDialogAction[];
  middleActions?: FormDialogAction[];
  rightActions?: FormDialogAction[];
};

// TODO: I18N

// A form dialog that creates the components from fields metadata
export const FormDialog = <T extends object>(props: FormDialogProps<T>) => {
  console.log('FormDialog');

  const {
    open,
    title,
    message,
    data,
    fields,
    gridProps,
    onSubmit,
    onClose,
    leftActions,
    middleActions,
    rightActions,
  } = props;

  const isMobile = useIsMobile();
  const form = useForm({ data, fields, onSubmit });

  return (
    <Dialog
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { p: '1em' } }}
    >
      <DialogTitle component="div" id="alert-dialog-title">
        <Typography variant="h4" color="primary">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <>
          {message && (
            <DialogContentText id="alert-dialog-description">
              {message}
              <br></br>
              <br></br>
            </DialogContentText>
          )}
          <Form data={data} form={form} fields={fields} gridProps={gridProps} />
        </>
      </DialogContent>
      <DialogActions>
        {leftActions?.map((action) => action(form))}
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        {middleActions?.map((action) => action(form))}
        <Button variant="contained" onClick={(e) => form.submit()}>
          Salvar
        </Button>
        {rightActions?.map((action) => action(form))}
      </DialogActions>
      {/* )} */}
    </Dialog>
  );
};

// export default memo(FormDialog) as typeof FormDialog;
export default FormDialog;

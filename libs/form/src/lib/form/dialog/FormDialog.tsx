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
// import { useFillHeight } from '../../hooks/useFillHeight';
// import { useIsKeyboardOpen } from '../../hooks/useIsKeyboardOpen';
import { useIsMobile } from '../../hooks/useIsMobile';

import { Form, FormField } from '../Form';
import { FormContextProps, useForm } from '../FormContext';
import { FormContextProvider } from '../FormContextProvider';

export type FormDialogAction = (form: FormContextProps) => ReactNode;

// Props for a form dialog that creates the components from fields metadata
type FormDialogProps<T> = {
  open: boolean;
  title: string;
  message?: string;
  data: T;
  fields: FormField<T>[];
  gridProps?: object;
  onConfirm: () => void;
  onConfirmDuplicate?: () => void;
  onClose: () => void;
  leftActions?: FormDialogAction[];
  middleActions?: FormDialogAction[];
  rightActions?: FormDialogAction[];
};

// A form dialog that creates the components from fields metadata
const FormDialogInner = <T extends object>(props: FormDialogProps<T>) => {
  const {
    open,
    title,
    message,
    data,
    fields,
    gridProps,
    onClose,
    leftActions,
    middleActions,
    rightActions,
  } = props;

  // const [height, setHeight] = useState(0);
  // const ref = useFillHeight(true, (height) => setHeight(height));
  // const isKeyboardOpen = useIsKeyboardOpen(height);

  const isMobile = useIsMobile();
  const form = useForm();

  return (
    <Dialog
      // ref={ref}
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
          <Form data={data} fields={fields} gridProps={gridProps} />
        </>
      </DialogContent>
      {/* {!(isMobile && isKeyboardOpen) && ( */}
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

// A form dialog that creates the components from fields metadata
export const FormDialog = <T extends object>(props: FormDialogProps<T>) => {
  return (
    <FormContextProvider onSubmit={props.onConfirm}>
      <FormDialogInner {...props} />
    </FormContextProvider>
  );
};

// export default memo(FormDialog) as typeof FormDialog;
export default FormDialog;

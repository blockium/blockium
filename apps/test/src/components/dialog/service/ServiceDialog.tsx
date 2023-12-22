import { useEffect, useState } from 'react';
import { date, number, string } from 'yup';

// custom ui
import { Alert, useAlert } from '@blockium/ui';
import { FormDialog, FormField } from '@blockium/form';

// model
import { DEFAULT_SERVICE, IService } from '../../../types';
import { useAddService, useUpdateService } from '../../../data';

type ServiceDialogProps = {
  open: boolean;
  service?: IService;
  onClose: () => void;
  onAddCallback?: (service: IService) => void;
};

const ServiceDialog: React.FC<ServiceDialogProps> = (props) => {
  const { open, service, onClose, onAddCallback } = props;

  const isNew = !service?.id;
  const [currentService, setCurrentService] = useState<IService>(
    isNew ? DEFAULT_SERVICE : service,
  );

  useEffect(() => {
    !service?.id
      ? setCurrentService(DEFAULT_SERVICE)
      : setCurrentService(service);
  }, [service]);

  const { addService } = useAddService();
  const { updateService } = useUpdateService();

  const { alert, showAlert, closeAlert } = useAlert();

  const addData = async () => {
    console.log('addData');
    const result = addService(currentService);
    if (typeof result !== 'string') {
      onAddCallback?.(result);
      setCurrentService(DEFAULT_SERVICE); // clear current data
      onClose();
      showAlert('Serviço adicionado com sucesso.');
    } else {
      console.log(result);
      showAlert(result, true);
    }
  };

  const changeData = async () => {
    console.log('changeData');
    const result = updateService(currentService);
    if (typeof result !== 'string') {
      setCurrentService(DEFAULT_SERVICE); // clear current data
      onClose();
      showAlert('Serviço alterado com sucesso.');
    } else {
      console.log(result);
      showAlert(result, true);
    }
  };

  const handleChange = (key: keyof IService, value: string | number | null) => {
    setCurrentService({
      ...currentService,
      [key]: value,
    });
  };

  const uiProps = { variant: 'outlined' }; // "filled", "outlined" or "standard"
  const fields: FormField<IService>[] = [
    {
      key: 'name',
      formLabel: 'Serviço *',
      formType: 'text',
      textType: 'text',
      validation: string().required(),
      onChange: (value: string | null) => handleChange('name', value),
      uiProps,
    },
    {
      key: 'price',
      formLabel: 'Preço *',
      formType: 'number',
      prefix: 'R$',
      validation: number().required().positive(),
      onChange: (value: string | null) => handleChange('price', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'quantity',
      formLabel: 'Meta Mensal *',
      formType: 'number',
      validation: number().required().integer().positive(),
      onChange: (value: string | null) =>
        handleChange('quantity', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'duration',
      formLabel: 'Duração',
      formType: 'time',
      validation: date().nullable(),
      onChange: (value: string | null) => handleChange('duration', value),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'dayInterval',
      formLabel: 'Intervalo para Retorno',
      formType: 'number',
      suffix: 'dias',
      validation: number().integer().positive(),
      onChange: (value: string | null) =>
        handleChange('dayInterval', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'group',
      formLabel: 'Grupo',
      formType: 'text',
      textType: 'text',
      validation: string(),
      onChange: (value: string | null) => handleChange('group', value),
      uiProps,
    },
  ];

  return (
    <>
      <FormDialog
        open={open}
        title={isNew ? 'Novo Serviço' : 'Alterar Serviço'}
        data={currentService}
        fields={fields}
        onClose={onClose}
        onConfirm={isNew ? addData : changeData}
      />
      <Alert
        onClose={closeAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

export default ServiceDialog;

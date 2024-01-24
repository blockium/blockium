import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { date, number, string } from 'yup';
import { useSnackbar } from 'notistack';

// custom ui
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
  const { t } = useTranslation();

  const [currentService, setCurrentService] =
    useState<IService>(DEFAULT_SERVICE);

  const isNew = !service?.id;

  useEffect(() => {
    !service?.id
      ? setCurrentService(DEFAULT_SERVICE)
      : setCurrentService(service);
  }, [service]);

  const { addService } = useAddService();
  const { updateService } = useUpdateService();

  const { enqueueSnackbar } = useSnackbar();

  const addData = async () => {
    console.log('addData');
    const result = addService(currentService);
    if (typeof result !== 'string') {
      onAddCallback?.(result);
      setCurrentService(DEFAULT_SERVICE); // clear current data
      onClose();
      enqueueSnackbar(t('service-added'));
    } else {
      console.log(result);
      enqueueSnackbar(result, { variant: 'error' });
    }
  };

  const changeData = async () => {
    console.log('changeData');
    const result = updateService(currentService);
    if (typeof result !== 'string') {
      setCurrentService(DEFAULT_SERVICE); // clear current data
      onClose();
      enqueueSnackbar(t('service-changed'));
    } else {
      console.log(result);
      enqueueSnackbar(result, { variant: 'error' });
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
      formLabel: t('form-service-name'),
      formType: 'text',
      textType: 'text',
      validation: string().required(),
      onChange: (value: string | null) => handleChange('name', value),
      uiProps,
    },
    {
      key: 'price',
      formLabel: t('form-service-price'),
      formType: 'number',
      prefix: t('form-service-price-prefix'),
      validation: number().required().positive(),
      onChange: (value: string | null) => handleChange('price', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'quantity',
      formLabel: t('form-service-quantity'),
      formType: 'number',
      validation: number().required().integer().positive(),
      onChange: (value: string | null) =>
        handleChange('quantity', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'duration',
      formLabel: t('form-service-duration'),
      formType: 'time',
      validation: date().nullable(),
      onChange: (value: string | null) => handleChange('duration', value),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'dayInterval',
      formLabel: t('form-service-day-interval'),
      formType: 'number',
      suffix: t('form-service-day-interval-suffix'),
      validation: number().integer().positive(),
      onChange: (value: string | null) =>
        handleChange('dayInterval', Number(value)),
      gridProps: { xs: 12, sm: 6 },
      uiProps,
    },
    {
      key: 'group',
      formLabel: t('form-service-group'),
      formType: 'text',
      textType: 'text',
      validation: string(),
      onChange: (value: string | null) => handleChange('group', value),
      uiProps,
    },
  ];

  return (
    <FormDialog
      open={open}
      title={
        isNew ? t('form-title-new-service') : t('form-title-change-service')
      }
      data={currentService}
      fields={fields}
      onClose={onClose}
      onSubmit={isNew ? addData : changeData}
    />
  );
};

export default ServiceDialog;

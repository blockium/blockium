import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'yup';

export const useFormTranslation = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setLocale({
      mixed: {
        default: t('form:yup.mixed.default'),
        required: t('form:yup.mixed.required'),
        notType: t('form:yup.mixed.notType'),
      },
      number: {
        min: t('form:yup.number.min'),
        max: t('form:yup.number.max'),
        positive: t('form:yup.number.positive'),
        integer: t('form:yup.number.integer'),
      },
      string: {
        email: t('form:yup.string.email'),
      },
    });
  }, [t]);
};

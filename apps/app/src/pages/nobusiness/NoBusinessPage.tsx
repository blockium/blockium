import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';

import { CTAButton } from '@blockium/ui-common';

export const NoBusinessPage: React.FC = (props) => {
  const navigate = useNavigate();
  const goBusinessPage = () => {
    navigate('/business');
  };
  const { t } = useTranslation();

  return (
    <Stack gap="48px" alignItems="center" textAlign="center">
      <Typography variant="h6">{t('business-info-required')}</Typography>
      <CTAButton onClick={goBusinessPage}>
        {t('button.click-to-continue')}
      </CTAButton>
    </Stack>
  );
};

export default NoBusinessPage;

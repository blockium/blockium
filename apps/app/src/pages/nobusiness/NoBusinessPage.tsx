import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import { msg } from '@postgpt/i18n';
import { CTAButton } from '@postgpt/ui-common';

export const NoBusinessPage: React.FC = (props) => {
  const navigate = useNavigate();
  const goBusinessPage = () => {
    navigate('/business');
  };

  return (
    <Stack gap="48px" alignItems="center" textAlign="center">
      <Typography variant="h6">{msg('app.business-info-required')}</Typography>
      <CTAButton onClick={goBusinessPage}>
        {msg('app.button.click-to-continue')}
      </CTAButton>
    </Stack>
  );
};

export default NoBusinessPage;

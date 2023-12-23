import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { Store as StoreIcon } from '@mui/icons-material';

import { CTAButton } from '@blockium/ui';
import { isEmpty } from '@blockium/utils';
import { saveUserBusiness, useUser } from '@criaty/model';

interface BusinessPageProps {
  title?: string;
  subheader?: string;
}

// TODO: !!! After login, if there is no business information, redirect to this page
export const BusinessPage: React.FC<BusinessPageProps> = ({
  title,
  subheader,
}) => {
  const { t } = useTranslation();

  const user = useUser();
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessServices, setBusinessServices] = useState('');

  const [loading, setLoading] = useState(false);

  // Load business data from the database.
  useEffect(() => {
    if (user) {
      setBusinessName(user.business?.name || '');
      setBusinessDescription(user.business?.description || '');
      setBusinessServices(user.business?.services || '');
    }
  }, [user]);

  // Save business data to the database
  const onSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await saveUserBusiness({
        ...user,
        business: {
          name: businessName,
          description: businessDescription,
          services: businessServices,
        },
      });
      enqueueSnackbar(t('page.business.saveSuccess'));
      //
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('page.business.saveError'), { variant: 'error' });
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardHeader
        avatar={
          <Avatar aria-label="business">
            <StoreIcon />
          </Avatar>
        }
        title={t('page.business.title')}
        subheader={t('page.business.subheader')}
      />
      <CardContent>
        {/* Business name Input */}
        <TextField
          type="text"
          label={t('page.business.name')}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          fullWidth
        />
        {/* Business description Input */}
        <TextField
          type="text"
          label={t('page.business.description')}
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        {/* Business services Input */}
        <TextField
          type="text"
          label={t('page.business.services')}
          value={businessServices}
          onChange={(e) => setBusinessServices(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </CardContent>
      <CardActions>
        <CTAButton
          onClick={onSave}
          loading={loading}
          disabled={
            isEmpty(businessName) ||
            isEmpty(businessDescription) ||
            isEmpty(businessServices)
          }
        >
          {t('button.save')}
        </CTAButton>
      </CardActions>
    </Card>
  );
};

export default BusinessPage;

import { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import { msg } from '@blockium/i18n';
import { Alert, CTAButton } from '@blockium/ui-common';
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
  const user = useUser();
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessServices, setBusinessServices] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

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
      setMessage(msg('app.page.business.saveSuccess'));
      setSeverity('success');
      //
    } catch (error) {
      console.error(error);
      setMessage(msg('app.page.business.saveError'));
      setSeverity('error');
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert severity={severity} message={message} setMessage={setMessage} />
      <Card>
        {/* <CardHeader title={title} subheader={subheader} /> */}
        <CardHeader
          avatar={
            <Avatar aria-label="business">
              <StoreIcon />
            </Avatar>
          }
          title={msg('app.page.business.title')}
          subheader={msg('app.page.business.subheader')}
        />
        <CardContent>
          {/* Business name Input */}
          <TextField
            type="text"
            label={msg('app.page.business.name')}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            fullWidth
          />
          {/* Business description Input */}
          <TextField
            type="text"
            label={msg('app.page.business.description')}
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          {/* Business services Input */}
          <TextField
            type="text"
            label={msg('app.page.business.services')}
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
            {msg('app.button.save')}
          </CTAButton>
        </CardActions>
      </Card>
    </>
  );
};

export default BusinessPage;

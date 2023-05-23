import { useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import { msg } from '@postgpt/i18n';
import { CTAButton } from '@postgpt/ui-common';
import { isEmpty } from '@postgpt/utils';

interface BusinessPageProps {
  title?: string;
  subheader?: string;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({
  title,
  subheader,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessServices, setBusinessServices] = useState('');

  const onSave = () => {
    console.log('onSave');
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
  );
};

export default BusinessPage;

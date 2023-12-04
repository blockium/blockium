import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';

import { CTAButton } from '@blockium/ui';
import { Partner, PartnerPermission } from '@criaty/model-types';
import { isEmpty } from '@blockium/utils';
import { useUser } from '@criaty/model';

interface IPartnerViewProps {
  partner: Partner;
  onGoBack: () => void;
  onPartnerAdded: (partner: Partner) => void;
  onPartnerDeleted: (partner: Partner) => void;
  setMessage: (message: string | null) => void;
  setSeverity: (severity: 'success' | 'error') => void;
}

export const PartnerView: React.FC<IPartnerViewProps> = ({
  partner,
  onGoBack,
  onPartnerAdded,
  onPartnerDeleted,
  setMessage,
  setSeverity,
}) => {
  const { t } = useTranslation();
  const user = useUser();
  const [partnerName, setPartnerName] = useState(partner.name);
  const [partnerEmail, setPartnerEmail] = useState(partner.email);
  const [partnerPhone, setPartnerPhone] = useState(partner.phone);
  const [permission, setPermission] = useState(partner.permission);

  const [loading, setLoading] = useState(false);

  // Save partner data to the database
  const onSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      partner.createdAt = new Date();

      // TODO: !!! Save partner data to the database
      // TODO: !!! Allow partner access to the user's post. It may edit or view the posts.
      // TODO: !!! When a partner is added, the partner view the user as a customer in the customers page.
      // TODO: !!! When a partner clicks a customer it changes to customer view.
      // TODO: !!! How the partner can go back to view their own posts?
      // TODO: !!! When a partner is deleted, the partner can no longer view the user as a customer in the customers page.
      // TODO: !!! When a partner is deleted, the partner can no longer view or edit the user's posts.

      // TODO: !!! Update partner id fromthe database
      partner.id = new Date().toISOString();

      partner.name = partnerName;
      partner.email = partnerEmail;
      partner.phone = partnerPhone;
      partner.permission = permission;
      onPartnerAdded(partner);

      setMessage(t('page.partner.saveSuccess'));
      setSeverity('success');
      //
    } catch (error) {
      console.error(error);
      setMessage(t('page.partner.saveError'));
      setSeverity('error');
      //
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!user) return;

    // TODO: !!! Confirm delete partner

    setLoading(true);
    try {
      // TODO: !!! Delete partner data from the database

      onPartnerDeleted(partner);

      setMessage(t('page.partner.deleteSuccess'));
      setSeverity('success');
      //
    } catch (error) {
      console.error(error);
      setMessage(t('page.partner.deleteError'));
      setSeverity('error');
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="partner">
            <HandshakeIcon />
          </Avatar>
        }
        title={t('page.partner.title')}
        subheader={t('page.partner.subheader')}
      />
      <CardContent>
        {/* Partner name Input */}
        <TextField
          required
          autoFocus
          type="text"
          label={t('page.partner.name')}
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          fullWidth
        />
        {/* Partner email Input */}
        <TextField
          required
          type="email"
          label={t('page.partner.email')}
          value={partnerEmail}
          onChange={(e) => setPartnerEmail(e.target.value)}
          fullWidth
        />
        {/* Partner phone Input */}
        <TextField
          required
          type="phone"
          label={t('page.partner.phone')}
          value={partnerPhone}
          onChange={(e) => setPartnerPhone(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="partner-permission-label" required>
            {t('page.partner.permission')}
          </InputLabel>
          <Select
            labelId="partner-permission-label"
            id="partner-permission"
            value={permission}
            label={t('page.partner.permission')}
            onChange={(e) => setPermission(e.target.value as PartnerPermission)}
          >
            <MenuItem value="editor">
              {t('page.partner.permission-editor')}
            </MenuItem>
            <MenuItem value="viewer">
              {t('page.partner.permission-viewer')}
            </MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <CTAButton variant="outlined" onClick={onGoBack}>
          {t('button.back')}
        </CTAButton>
        <CTAButton variant="outlined" color="error" onClick={onDelete}>
          {t('button.delete')}
        </CTAButton>
        {/* TODO: !!! Validate email */}
        {/* TODO: !!! Validate phone */}
        <CTAButton
          onClick={onSave}
          loading={loading}
          disabled={
            isEmpty(partnerName) ||
            isEmpty(partnerEmail) ||
            isEmpty(partnerPhone)
          }
        >
          {t('button.save')}
        </CTAButton>
      </CardActions>
    </Card>
  );
};

export default PartnerView;

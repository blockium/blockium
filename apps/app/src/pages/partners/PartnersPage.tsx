import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Handshake as HandshakeIcon } from '@mui/icons-material';

import { useUser } from '@criaty/model';
import { Partner } from '@criaty/model-types';
import { Alert, CTAButton } from '@blockium/ui';

import { PartnerView } from './PartnerView';

// TODO: !!! PartnersPage
export const PartnersPage: React.FC = () => {
  const { t } = useTranslation();
  const user = useUser();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartner, setNewPartner] = useState<Partner | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  // Load partners data from the database.
  useEffect(() => {
    if (user) {
      // TODO: !!! Load partners data from the database.
      setPartners([]);
    }
  }, [user]);

  // Show new partner = PartnerView
  const onShowNewPartner = () => {
    const newPartner: Partner = {
      id: '',
      name: '',
      email: '',
      phone: '',
      permission: 'viewer',
    };
    setNewPartner(newPartner);
  };

  const onPartnerAdded = (partner: Partner) => {
    setPartners([...partners, partner]);
    setNewPartner(null);
  };

  const onPartnerDeleted = (partner: Partner) => {
    setPartners(partners.filter((p) => p.id !== partner.id));
    setNewPartner(null);
  };

  if (newPartner) {
    return (
      <PartnerView
        partner={newPartner}
        onGoBack={() => setNewPartner(null)}
        onPartnerAdded={onPartnerAdded}
        onPartnerDeleted={onPartnerDeleted}
        setMessage={setMessage}
        setSeverity={setSeverity}
      />
    );
  }

  return (
    <>
      <Alert severity={severity} message={message} setMessage={setMessage} />
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="newPartner">
              <HandshakeIcon />
            </Avatar>
          }
          title={t('page.partners.title')}
          subheader={t('page.partners.subheader')}
        />
        <CardContent>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{ overflow: 'auto' }}
          >
            {partners.map((partner) => {
              return (
                <ListItemButton
                  key={partner.id}
                  onClick={() => setNewPartner(partner)}
                >
                  <ListItemText primary={partner.name} />
                </ListItemButton>
              );
            })}
            {partners.length === 0 && (
              <ListSubheader component="div" id="nested-list-subheader">
                {t('page.partners.noPartners')}
              </ListSubheader>
            )}
          </List>
        </CardContent>
        <CardActions>
          <CTAButton onClick={onShowNewPartner}>{t('button.add')}</CTAButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PartnersPage;

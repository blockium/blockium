import { useEffect, useState } from 'react';

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
import HandshakeIcon from '@mui/icons-material/Handshake';

import { useUser } from '@postgpt/firebase';
import { Partner } from '@postgpt/types';
import { msg } from '@postgpt/i18n';
import { Alert, CTAButton } from '@postgpt/ui-common';

import { PartnerView } from './PartnerView';

// TODO: !!! PartnersPage
export const PartnersPage: React.FC = () => {
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
          title={msg('app.page.partners.title')}
          subheader={msg('app.page.partners.subheader')}
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
                {msg('app.page.partners.noPartners')}
              </ListSubheader>
            )}
          </List>
        </CardContent>
        <CardActions>
          <CTAButton onClick={onShowNewPartner}>
            {msg('app.button.add')}
          </CTAButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PartnersPage;
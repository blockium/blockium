import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Paid as PaidIcon } from '@mui/icons-material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { ThumbDown as ThumbDownIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { People as PeopleIcon } from '@mui/icons-material';

// import { useAuth } from '@blockium/firebase';
import { ChatWidget, IChatMessage, SummaryWidget } from '@blockium/ui';

import { Revenue } from '../table/revenue/Revenue';
import { FinanceEvolution } from '../chart/finance/evolution/FinanceEvolution';

export interface IFinanceDashboardProps {
  children?: React.ReactNode;
}

export const Home: React.FC<IFinanceDashboardProps> = (props) => {
  const theme = useTheme();
  // const [authUser] = useAuth();

  const customerServiceSum = 2500;
  const customerServiceCount = 12;
  const monthBalance = -4500;
  const customerCount = 45;

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    {
      avatar: '',
      messages: [
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ],
    },
    {
      side: 'right',
      messages: [
        "Great! What's about you?",
        'Of course I did. Speaking of which check this out',
      ],
    },
    { avatar: '', messages: ['Im good.', 'See u later.'] },
  ]);

  const onSendMessage = async (message: string) => {
    const lastMessages = chatMessages[chatMessages.length - 1];
    if (lastMessages.side === 'right') {
      lastMessages.messages?.push(message);
      setChatMessages([...chatMessages]);
    } else {
      setChatMessages([
        ...chatMessages,
        {
          side: 'right',
          messages: [message],
        },
      ]);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: theme.spacing(10) }}>
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, {authUser?.displayName}!
      </Typography> */}
      <Typography variant="h3" sx={{ mb: 5 }}>
        Painel Financeiro
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <ChatWidget
            messages={chatMessages}
            height={{ xs: 320, md: 300 }}
            onSendMessage={onSendMessage}
          />
          {/* <HeroWidget
            height={{ xs: 550, md: 320 }}
            title="Welcome back 👋 Jaydon Frankie"
            message="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            imageSrc="/images/photo0.webp"
            // imageFullHeight={false}
            xsImageHeight={200}
            actions={[
              {
                label: 'Go Now',
                onClick: () => {
                  console.log('Clicked');
                },
              },
              // {
              //   label: 'Return',
              //   onClick: () => {
              //     console.log('Clicked');
              //   },
              // },
            ]}
          /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FinanceEvolution />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Receita no Mês"
            total={customerServiceSum}
            color="success"
            icon={<PaidIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Resultado no Mês"
            total={monthBalance}
            color={monthBalance < 0 ? 'error' : 'success'}
            icon={monthBalance < 0 ? <ThumbDownIcon /> : <ThumbUpIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Atendimentos no Mês"
            total={customerServiceCount}
            color="info"
            icon={<FavoriteIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Clientes"
            total={customerCount}
            color="primary"
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Revenue />
        </Grid>
        {/* <Grid item xs={12}>
          <ProgressWidget />
        </Grid> */}
        {/* {customerServicesCount.length > 0 && (
          <Grid item xs={12} md={6} lg={4}>
            <PieChart
              title="Tipos de Atendimentos"
              chartData={customerServicesCount}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
                theme.palette.chart.green[0],
              ]}
            />
          </Grid>
        )} */}
      </Grid>
    </Container>
  );
};

export default Home;

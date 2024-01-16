import { HeroWidget } from '@blockium/ui';

export const FinanceHero: React.FC = () => {
  return (
    <HeroWidget
      height={{ xs: 550, sm: 320 }}
      title="Parabéns 👏👏👏"
      message="Você está perto da meta esse mês! Veja os números!"
      imageSrc="/images/photo0.webp"
      // imageFullHeight={false}
      xsImageHeight={200}
      actions={[
        {
          label: 'Resuma os Números',
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
    />
  );
};

export default FinanceHero;

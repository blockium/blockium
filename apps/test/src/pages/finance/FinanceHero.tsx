import { HeroWidget } from '@blockium/ui';

export const FinanceHero: React.FC = () => {
  return (
    <HeroWidget
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
    />
  );
};

export default FinanceHero;

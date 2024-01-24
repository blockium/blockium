import { useTranslation } from 'react-i18next';
import { HeroWidget } from '@blockium/ui';

export const FinanceHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeroWidget
      height={{ xs: 550, sm: 320 }}
      title={t('finance-hero-title')}
      message={t('finance-hero-message')}
      imageSrc="/images/photo0.webp"
      // imageFullHeight={false}
      xsImageHeight={200}
      actions={[
        {
          label: t('finance-hero-button'),
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

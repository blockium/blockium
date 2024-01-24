import { HeroWidget } from '@blockium/ui';
import { useTranslation } from 'react-i18next';

export const MarketingHero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <HeroWidget
      height={{ xs: 550, sm: 320 }}
      title={t('marketing-hero-title')}
      message={t('marketing-hero-message')}
      imageSrc="/images/photo0.webp"
      // imageFullHeight={false}
      xsImageHeight={200}
      actions={[
        {
          label: t('marketing-hero-button'),
          onClick: () => {
            console.log('Clicked');
          },
        },
      ]}
    />
  );
};

export default MarketingHero;

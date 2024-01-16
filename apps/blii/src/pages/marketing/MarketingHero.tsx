import { HeroWidget } from '@blockium/ui';

export const MarketingHero: React.FC = () => {
  return (
    <HeroWidget
      height={{ xs: 550, sm: 320 }}
      title="Vários clientes já podem voltar"
      message="Você tem 18 clientes que podem fazer manutenção do serviço realizado. Entre em contato com eles!"
      imageSrc="/images/photo0.webp"
      // imageFullHeight={false}
      xsImageHeight={200}
      actions={[
        {
          label: 'Me Mostre',
          onClick: () => {
            console.log('Clicked');
          },
        },
      ]}
    />
  );
};

export default MarketingHero;

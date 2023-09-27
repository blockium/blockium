import { PostFormat, PostType } from '@criaty/model';

export const getPostOfferPrompt = (
  product: string,
  offer: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(product, offer, slidesCount, tone);
    case 'image':
      return getImagePrompt(product, offer, format, tone);
    case 'video':
      return getVideoPrompt(product, offer, format, tone);
  }
};

const getCarouselPrompt = (
  product: string,
  offer: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a promoção do Serviço/Produto" de ${product} com a oferta ${offer}, no formato de carrossel, com ${slidesCount} slides.

${tonePrompt}

O resultado deve vir num JSON, no formato:

{
	"title": "título",
	"description": "descrição (máximo 200 caracteres)",
	"hashtags": "cinco hashtags",
	"format": "feed",
	"type": "carousel",
	"typeDescription": "a descrição das imagens e do texto (caption)"
}

Exemplo:

{
  "title": "Celebre o Dia dos Pais com Estilo!",
  "description": "Mostre o quanto você se importa presenteando seu pai com unhas de gel impecáveis. Agende agora!",
  "hashtags": "#DiaDosPais #UnhasDeGel #EstiloMasculino #PaiVaidoso #Beleza",
  "format": "feed",
  "type": "carousel",
  "typeDescription": "Slide 1: Preparado para surpreender no Dia dos Pais?\nSlide 2: Estilo e sofisticação não têm gênero!\nSlide 3:  Unhas de gel não são só para mulheres.\nSlide 4: Dê ao seu pai o presente que ele merece neste Dia dos Pais.\nSlide 5: Deixe seu pai experimentar o luxo do cuidado das unhas. Agende um momento especial para o seu herói no Dia dos Pais!"
}
`;
};

const getImagePrompt = (
  product: string,
  offer: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a promoção do Serviço/Produto" de ${product} com a oferta ${offer}, no formato de imagem para ${format}.

${tonePrompt}

O resultado deve vir num JSON, no formato:

{
	"title": "título",
	"description": "descrição (máximo 200 caracteres)",
	"hashtags": "cinco hashtags",
	"format": "${format}",
	"type": "image",
	"typeDescription": "descrição da imagem"
}

Exemplo:

{
  "title": "Celebre o Dia dos Pais com Estilo!",
  "description": "Mostre o quanto você se importa presenteando seu pai com unhas de gel impecáveis. Agende agora!",
  "hashtags": "#DiaDosPais #UnhasDeGel #EstiloMasculino #PaiVaidoso #Beleza",
  "format": "${format}",
  "type": "image",
  "typeDescription": "A imagem destaca a transformação de ideias em posts impressionantes, tudo com nosso Assistente Inteligente. Aproveite a oferta!"
}
`;
};

const getVideoPrompt = (
  product: string,
  offer: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a promoção do Serviço/Produto" de ${product} com a oferta ${offer}, no formato de vídeo para ${format}.

${tonePrompt}

O resultado deve vir num JSON, no formato:

{
	"title": "título",
	"description": "descrição (máximo 200 caracteres)",
	"hashtags": "cinco hashtags",
	"format": "${format}",
	"type": "video",
	"typeDescription": "Roteiro de como dever ser criado o video, em até 1000 caracteres"
}

Exemplo:

{
  "title": "Celebre o Dia dos Pais com Estilo!",
  "description": "Mostre o quanto você se importa presenteando seu pai com unhas de gel impecáveis. Agende agora!",
  "hashtags": "#DiaDosPais #UnhasDeGel #EstiloMasculino #PaiVaidoso #Beleza",
  "format": "${format}",
  "type": "video",
  "typeDescription": "Quer turbinar o seu Instagram? A nossa oferta imperdível chegou: a Assistente Inteligente vai revolucionar a forma como você planeja os seus posts. Vem comigo no passo a passo:\n\nPasso 1: Acesse o Site\nEntre no nosso site e faça login na sua conta. Se você ainda não tem uma conta, é rapidinho para se cadastrar!\n\nPasso 2: Escolha o Serviço\nNa página principal, clique na opção 'Assistente Inteligente' e escolha o plano que mais combina com você.\n\nPasso 3: Aproveite a Promoção\nGaranta a sua assinatura com um super desconto! Economize R$100 no plano anual e leve a assistente por apenas R$399.\n\nNão fique de fora dessa! A promoção é válida somente para os 100 primeiros clientes. Aumente seu engajamento e conquiste mais seguidores com posts que vão surpreender. Bora lá!"
}
`;
};

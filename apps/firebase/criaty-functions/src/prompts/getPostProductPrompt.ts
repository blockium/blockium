import { PostFormat, PostType } from '@criaty/model';

export const getPostProductPrompt = (
  product: string,
  topic: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(product, topic, slidesCount, tone);
    case 'image':
      return getImagePrompt(product, topic, format, tone);
    case 'video':
      return getVideoPrompt(product, topic, format, tone);
  }
};

const getCarouselPrompt = (
  product: string,
  topic: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o Serviço/Produto" de ${product} com o tema ${topic}, no formato de carrossel, com ${slidesCount} slides.

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
}`;
};

const getImagePrompt = (
  product: string,
  topic: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o Serviço/Produto" de ${product} com o tema ${topic}, no formato de imagem para ${format}.

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
  "typeDescription": "Imagem ilustrativa de um smartphone com o aplicativo do Instagram e o nosso logo, mostrando facilidade de uso e eficiência."
}`;
};

const getVideoPrompt = (
  product: string,
  topic: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o Serviço/Produto" de ${product} com o tema ${topic}, no formato de vídeo para ${format}.

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
  "typeDescription": "Roteiro do vídeo:\n\n1. Cena inicial: Mostrar alguém estressado tentando planejar posts.\n2. Transição para a nossa plataforma: Demonstração da interface amigável.\n3. Destacar recursos: Arraste e solte, agendamento automático, sugestões de conteúdo.\n4. Mostrar a pessoa relaxada e sorrindo.\n5. Chamada para ação: Experimente agora e transforme seu Instagram!\n6. Logotipo e informações de contato."
}`;
};

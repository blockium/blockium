import { PostFormat, PostType } from '@criaty/model';

export const getPostNoveltyPrompt = (
  novelty: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(novelty, slidesCount, tone);
    case 'image':
      return getImagePrompt(novelty, format, tone);
    case 'video':
      return getVideoPrompt(novelty, format, tone);
  }
};

const getCarouselPrompt = (
  novelty: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o seguinte Lançamento ou Novidade": "${novelty}", no formato de carrossel, com ${slidesCount} slides.

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
  "title": "Unhas de Gel Parisienses, a nova sensação do Brasil",
  "description": "Descubra o luxo e elegância das Unhas de Gel Parisienses. Agende agora mesmo!",
  "hashtags": "#UnhasDeGelParisienses #NovaSensação #ElegânciaNasMãos #AgendeHoje",
  "format": "feed",
  "type": "carousel",
  "typeDescription": "Slide 1: Introdução - Bem-vindo à revolução das unhas!\nSlide 2: Efeito Parisiense - O charme das ruas de Paris, nas suas mãos.\nSlide 3: Durabilidade Incrível - Unhas perfeitas por semanas!\nSlide 4: Escolha a Sua Arte - Personalize com designs únicos.\nSlide 5: Agende Agora! - Não perca a chance de experimentar.\nSlide 6: Cuidado Premium - Mãos merecem o melhor.\nSlide 7: Unhas Saudáveis - Tecnologia de ponta para proteção.\nSlide 8: Seja a Tendência - Mostre ao mundo suas unhas parisienses!"
}
`;
};

const getImagePrompt = (novelty: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o seguinte Lançamento ou Novidade": "${novelty}", no formato de imagem para ${format}.

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
  "title": "Unhas de Gel Parisienses: Elegância nas Suas Mãos!",
  "description": "Descubra a nova sensação em unhas. Agende agora para um toque parisiense em seu visual!",
  "hashtags": "#UnhasDeGelParisienses #NovaSensação #ElegânciaNasMãos #AgendeHoje",
  "format": "${format}",
  "type": "image",
  "typeDescription": "Imagem: Fundo elegante com uma mão segurando unhas de gel artísticas. Texto sobreposto: 'Unhas de Gel Parisienses - Transforme sua rotina em um desfile de moda!'"
}
`;
};

const getVideoPrompt = (novelty: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar o seguinte Lançamento ou Novidade": "${novelty}", no formato de vídeo para ${format}.

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
  "title": "Unhas de Gel Parisienses, a nova sensação do Brasil",
  "description": "Descubra a elegância e sofisticação das Unhas de Gel Parisienses! 🌟 Agora disponíveis no Brasil. Marque seu horário hoje mesmo!",
  "hashtags": "#UnhasDeGel #Parisienses #BelezaBrasil #Elegância #Novidade",
  "format": "${format}",
  "type": "video",
  "typeDescription": "Experimente a nova tendência em unhas! Aqui está um guia rápido:\n\nPasso 1: Introdução Impactante\nComece com um close das Unhas de Gel Parisienses e uma trilha sonora cativante. Use efeitos de transição para dar um toque dinâmico.\n\nPasso 2: Demonstração Detalhada\nMostre o processo de aplicação das Unhas de Gel Parisienses, realçando cada etapa com texto explicativo. Destaque as características exclusivas.\n\nPasso 3: Antes e Depois\nInclua imagens comparativas das unhas naturais e as Unhas de Gel Parisienses finalizadas. Destaque a diferença marcante.\n\nPasso 4: Depoimentos\nIncorpore depoimentos de clientes satisfeitas que experimentaram essa novidade. Mostre os resultados e elogios.\n\nPasso 5: Chamada para Ação\nTermine com um texto incentivando os espectadores a agendarem um horário para experimentar as Unhas de Gel Parisienses. Inclua informações de contato.\n\nSeja criativo, mantenha o vídeo curto e envolvente, e pronto para compartilhar a nova sensação em beleza!"
}
`;
};

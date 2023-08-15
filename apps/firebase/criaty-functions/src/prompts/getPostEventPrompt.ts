import { PostFormat, PostType } from '@postgpt/types';

export const getPostEventPrompt = (
  event: string,
  eventDetail: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  character?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(event, eventDetail, slidesCount, character);
    case 'image':
      return getImagePrompt(event, eventDetail, format, character);
    case 'video':
      return getVideoPrompt(event, eventDetail, format, character);
  }
};

const getCarouselPrompt = (
  event: string,
  eventDetail: string,
  slidesCount: number,
  character?: string,
) => {
  return `
Crie um post para Instagram com o objetivo de "Divulgar o Evento": "${event}", com os seguintes detalhes: "${eventDetail}", no formato de carrossel, com ${slidesCount} slides.

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
  "title": "Participe da Live: Desafio 'Postagens do Mês em 1 hora'",
  "description": "Venha criar 20 posts incríveis em apenas 1 hora! Dia 20/08/2023 às 21h. Não perca!",
  "hashtags": "#LiveEvent #DesafioCriativo #PostagensRápidas #MarketingDigital #Criatividade",
  "format": "feed",
  "type": "carousel",
  "typeDescription": "Slide 1: Prepare-se para o desafio do ano!\nSlide 2: Vamos testar suas habilidades de criação em alta velocidade.\nSlide 3: 20 posts em 1 hora? Você está pronto?\nSlide 4: Junte-se a nós e desbloqueie seu potencial criativo!\nSlide 5: Não deixe passar essa oportunidade de aprender e se divertir.\nSlide 6: Dê um impulso ao seu perfil com posts incríveis!\nSlide 7: Marque no calendário: 20 de agosto, 21h.\nSlide 8: Prepare-se para surpreender a todos com sua criatividade em tempo recorde!"
}
`;
};

const getImagePrompt = (
  event: string,
  eventDetail: string,
  format: PostFormat,
  character?: string,
) => {
  return `
Crie um post para Instagram com o objetivo de "Divulgar o Evento": "${event}", com os seguintes detalhes: "${eventDetail}", no formato de imagem para ${format}.

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
  "title": "Participe da Live: Desafio 'Postagens do Mês em 1 hora'",
  "description": "Venha criar 20 posts incríveis em apenas 1 hora! Dia 20/08/2023 às 21h. Não perca!",
  "hashtags": "#LiveEvent #DesafioCriativo #PostagensRápidas #MarketingDigital #Criatividade",
  "format": "${format}",
  "type": "image",
  "typeDescription": "Imagem mostrando um relógio marcando 1 hora, representando o desafio de criar 20 posts em tempo recorde. Não perca essa experiência!"
}
`;
};

const getVideoPrompt = (
  event: string,
  eventDetail: string,
  format: PostFormat,
  character?: string,
) => {
  return `
Crie um post para Instagram com o objetivo de "Divulgar o Evento": "${event}", com os seguintes detalhes: "${eventDetail}", no formato de vídeo para ${format}.

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
  "title": "Participe da Live: Desafio 'Postagens do Mês em 1 hora'",
  "description": "Vamos criar 20 posts incríveis em apenas 1 hora! Não perca o Desafio 'Postagens do Mês' e descubra como agilizar seu conteúdo. Dia 20/08/2023 às 21h. Te espero lá!",
  "hashtags": "#DesafioPostagens #Criatividade #MarketingDigital #LiveEvent #DicasDeConteudo",
  "format": "${format}",
  "type": "video",
  "typeDescription": "Quer aprender a produzir conteúdo de qualidade de forma rápida e eficiente? Não pode perder a Live 'Desafio Postagens do Mês em 1 hora'! Neste evento imperdível, vou te mostrar como criar 20 posts incríveis em apenas 60 minutos. É a oportunidade perfeita para você otimizar sua estratégia de conteúdo e aumentar seu engajamento.\n\nPasso a passo do que você vai aprender na Live:\n\n1. Planejamento Estratégico: Dicas para definir temas e ideias para suas postagens com antecedência.\n2. Criação Eficiente: Técnicas para produzir imagens e textos impactantes de maneira rápida.\n3. Ferramentas Top: Apresentação das melhores ferramentas online para agilizar o processo de criação.\n4. Cronograma Realista: Como distribuir suas postagens ao longo do mês sem sobrecarregar sua agenda.\n5. Engajamento Garantido: Estratégias para interagir com sua audiência e aumentar o alcance das suas postagens.\n\nPrepare-se para elevar sua presença online a um novo nível! Marque na agenda: 20 de agosto, às 21h. Nos vemos lá!"
}
`;
};

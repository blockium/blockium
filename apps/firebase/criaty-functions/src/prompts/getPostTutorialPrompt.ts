import { PostFormat, PostType } from '@postgpt/types';

export const getPostTutorialPrompt = (
  subject: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(subject, slidesCount, tone);
    case 'image':
      return getImagePrompt(subject, format, tone);
    case 'video':
      return getVideoPrompt(subject, format, tone);
  }
};

const getCarouselPrompt = (
  subject: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post de tutorial para Instagram sobre "${subject}", no formato de carrossel, com ${slidesCount} slides.

${tonePrompt}

O resultado deve vir num JSON, no formato:

{
	"title": "título",
	"description": "descrição (máximo 200 caracteres)",
	"hashtags": "cinco hashtags",
	"format": "feed",
	"type": "carousel",
	"typeDescription": "descrição do tutorial"
}

Exemplo:

{
  "title": "Celebre o Dia dos Pais com Estilo!",
  "description": "Mostre o quanto você se importa presenteando seu pai com unhas de gel impecáveis. Agende agora!",
  "hashtags": "#DiaDosPais #UnhasDeGel #EstiloMasculino #PaiVaidoso #Beleza",
  "format": "feed",
  "type": "carousel",
  "typeDescription": "Slide 1: Abra o aplicativo Criaty e faça login na sua conta.\nSlide 2: No menu de criação, selecione a opção 'Carrossel' para começar a criar o seu post.\nSlide 3: Selecione as imagens que deseja incluir no carrossel. Lembre-se de que cada slide contará uma parte da história do seu serviço.\nSlide 4: Digite um texto curto e cativante para cada imagem. Explique como seu serviço pode beneficiar os clientes.\nSlide 5: Revise cada slide, verificando erros. Depois, é só compartilhar seu carrossel incrível com seus seguidores!."
}
`;
};

const getImagePrompt = (subject: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram de call-to-action para um tutorial sobre "${subject}", no formato de imagem para ${format}.

${tonePrompt}

O resultado deve vir num JSON, no formato:

{
	"title": "título",
	"description": "descrição (máximo 200 caracteres)",
	"hashtags": "cinco hashtags",
	"format": "${format}",
	"type": "image",
	"typeDescription": "descrição da imagem do tutorial"
}

Exemplo:

{
  "title": "Celebre o Dia dos Pais com Estilo!",
  "description": "Mostre o quanto você se importa presenteando seu pai com unhas de gel impecáveis. Agende agora!",
  "hashtags": "#DiaDosPais #UnhasDeGel #EstiloMasculino #PaiVaidoso #Beleza",
  "format": "${format}",
  "type": "image",
  "typeDescription": "A imagem mostra as etapas do processo de criação do carrossel com a Criaty."
}
`;
};

const getVideoPrompt = (subject: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post de tutorial para Instagram sobre "${subject}", no formato de vídeo para ${format}.

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
  "typeDescription": "Olá pessoal! Bem-vindos ao tutorial de hoje sobre como gerar um carrossel de divulgação de um serviço usando a Criaty, a assistente inteligente que vai revolucionar seus posts no Instagram. Vamos seguir o passo a passo:\n\nPasso 1: Abra o Criaty\nAbra o aplicativo Criaty em seu dispositivo móvel e faça login na sua conta.\n\nPasso 2: Escolha o Serviço\nNa tela inicial, clique em 'Novo Post' e selecione o serviço que você deseja divulgar.\n\nPasso 3: Selecione o Estilo do Carrossel\nEscolha entre os diferentes estilos de carrossel oferecidos pela Criaty. Você pode selecionar o número de imagens e a disposição.\n\nPasso 4: Adicione Conteúdo\nPara cada imagem do carrossel, adicione fotos ou vídeos relacionados ao seu serviço. Até a próxima pessoal!\n"
}
`;
};

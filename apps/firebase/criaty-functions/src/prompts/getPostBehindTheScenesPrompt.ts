import { PostFormat, PostType } from '@postgpt/types';

export const getPostBehindTheScenesPrompt = (
  scene: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(scene, slidesCount, tone);
    case 'image':
      return getImagePrompt(scene, format, tone);
    case 'video':
      return getVideoPrompt(scene, format, tone);
  }
};

const getCarouselPrompt = (
  scene: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram de bastidor com a seguinte cena "${scene}", no formato de carrossel, com ${slidesCount} slides.

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
"title": "Pausa Pro Café com os Sócios!",
"description": "Um momento de descontração com a equipe. Café, risadas e ideias fluindo!",
"hashtags": "#EquipeTop #PausaProCafé #TrabalhoEmEquipe #EnergiaCriativa #Sócios",
"format": "feed",
"type": "carousel",
"typeDescription": "Slide 1: Um momento de descontração com a equipe. Café, risadas e ideias fluindo!\nSlide 2: Nada como uma pausa pro café para recarregar as energias e compartilhar novas ideias.\nSlide 3: Os melhores momentos acontecem durante esses intervalos que unem a equipe.\nSlide 4: A sinergia entre os sócios é fundamental para o sucesso do nosso negócio.\nSlide 5: Conversas descontraídas, troca de experiências e fortalecimento dos laços profissionais.\nSlide 6: Esses momentos não são apenas pausas, são investimentos no nosso trabalho.\nSlide 7: Juntos, enfrentamos desafios e celebramos conquistas a cada xícara de café.\nSlide 8: Mais do que sócios, somos uma equipe unida em busca da excelência.",
}
`;
};

const getImagePrompt = (scene: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram de bastidor com a seguinte cena "${scene}", no formato de imagem para ${format}.

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
  "title": "Pausa para um Café com os Sócios!",
  "description": "Recarregando energias e compartilhando ideias durante a pausa do dia. Ótimo trabalho em equipe!",
  "hashtags": "#CaféComSócios #TrabalhoEmEquipe #PausaEstratégica #IdeiasCriativas",
  "format": "${format}",
  "type": "image",
  "typeDescription": "A imagem captura o momento descontraído da pausa para o café, onde os sócios se reúnem para discutir ideias e estratégias."
}
`;
};

const getVideoPrompt = (scene: string, format: PostFormat, tone?: string) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram de bastidor com a seguinte cena "${scene}", no formato de vídeo para ${format}.

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
  "title": "Pausa para Café com os Sócios",
  "description": "Momento descontraído durante o dia de trabalho com os meus incríveis sócios. Café e boas conversas!",
  "hashtags": "#PausaParaCafé #TrabalhoEmEquipe #Sócios #Energia #Empreendedorismo",
  "format": "${format}",
  "type": "video",
  "typeDescription": "Olá pessoal! Neste Reels, quero compartilhar um momento especial dos bastidores com vocês: uma pausa para o café com os meus sócios. Vamos criar um vídeo envolvente que capture essa cena descontraída e reforce a importância da nossa equipe. Aqui está o roteiro para criar o vídeo:\n\nPasso 1: Cena Inicial\nComece com uma tomada ampla do nosso escritório ou espaço de trabalho, mostrando nossas mesas, computadores e a área de café.\n\nPasso 2: Introdução dos Personagens\nApresente cada um dos sócios de forma divertida. Mostre-os trabalhando e, em seguida, pegando suas xícaras de café.\n\nPasso 3: Momento do Café\nCrie uma montagem de cortes rápidos mostrando detalhes do café sendo preparado: moagem do grão, vapor saindo da máquina, xícaras sendo preenchidas.\n\nPasso 4: Conversa e Risadas\nMostre-nos juntos em uma mesa, rindo e conversando. Use legendas criativas para destacar nossos tópicos de conversa.\n\nPasso 5: Brinde\nCapture um brinde com as xícaras e sorrisos sinceros. Use uma transição suave para a próxima cena.\n\nPasso 6: Mensagem Final\nEncerre o vídeo com um texto que transmita a importância da colaboração, amizade e desses momentos de descontração para o sucesso do nosso empreendimento.\n\nEspero que gostem da ideia! Vamos mostrar ao mundo o quão incrível é a nossa equipe. Até a próxima!"
}
`;
};

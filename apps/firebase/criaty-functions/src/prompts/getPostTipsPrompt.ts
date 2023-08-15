import { PostFormat, PostType } from '@postgpt/types';

export const getPostTipsPrompt = (
  subject: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  character?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(subject, slidesCount, character);
    case 'image':
      return getImagePrompt(subject, format, character);
    case 'video':
      return getVideoPrompt(subject, format, character);
  }
};

const getCarouselPrompt = (
  subject: string,
  slidesCount: number,
  character?: string,
) => {
  return `
Crie um post de dicas para Instagram sobre "${subject}", no formato de carrossel, com ${slidesCount} slides.

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
  "title": "Crie um Carrossel Incrível com Criaty!",
  "description": "Aprenda a divulgar seu serviço com um carrossel cativante usando a assistente inteligente Criaty. Alcance mais seguidores e conquiste a atenção deles!",
  "hashtags": "#Criaty #CarrosselIncrível #DivulgaçãoEficiente #AssistenteInteligente #InstagramMarketing",
  "format": "feed",
  "type": "carousel",
  "typeDescription": "Slide 1: Abra o aplicativo Criaty e faça login na sua conta.\nSlide 2: Selecione a opção 'Carrossel' no menu de criação para começar o processo.\nSlide 3: Escolha imagens que representem seu serviço. Lembre-se de manter a coerência visual.\nSlide 4: Escreva um texto breve para cada imagem. Destaque os benefícios exclusivos do seu serviço.\nSlide 5: Organize a sequência das imagens para contar uma história coesa sobre seu serviço.\nSlide 6: Adicione elementos interativos, como enquetes ou perguntas, para engajar os espectadores.\nSlide 7: Utilize cores e fontes que combinem com sua marca para uma identidade consistente.\nSlide 8: Revise tudo! Verifique erros, formatação e a narrativa do carrossel antes de compartilhar com seu público."
}
`;
};

const getImagePrompt = (
  subject: string,
  format: PostFormat,
  character?: string,
) => {
  return `
Crie um post de dicas para Instagram sobre "${subject}", no formato de imagem para ${format}.

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
  "typeDescription": "Uma única imagem mostra as etapas do processo de criação do carrossel com a Criaty."
}
`;
};

const getVideoPrompt = (
  subject: string,
  format: PostFormat,
  character?: string,
) => {
  return `
Crie um post de dicas para Instagram sobre "${subject}", no formato de vídeo para ${format}.

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
  "title": "Dicas para Criar um Carrossel Incrível com a Criaty!",
  "description": "Aumente o engajamento dos seus seguidores com carrosséis incríveis! Aprenda com a Criaty a criar posts deslumbrantes para divulgar seus serviços.",
  "hashtags": "#CriatyTips #InstagramCarrossel #Engajamento #DicasDePosts #AssistenteInteligente",
  "format": "${format}",
  "type": "video",
  "typeDescription": "E aí, galera! Hoje, vamos aprender como gerar um carrossel de divulgação de um serviço com a Criaty, a assistente inteligente que vai transformar seu Instagram. Sigam as dicas abaixo e arrasem nas redes sociais!\n\nPasso 1: Acesse a Criaty\nAbra o aplicativo Criaty em seu dispositivo e faça o login na sua conta.\n\nPasso 2: Escolha seu Serviço\nNa tela inicial, clique em 'Novo Post' e selecione o serviço que você deseja destacar.\n\nPasso 3: Estilo do Carrossel\nEscolha entre diversos estilos de carrossel oferecidos pela Criaty. Decida o número de imagens e a disposição.\n\nPasso 4: Adicione Conteúdo Incrível\nPara cada imagem do carrossel, insira fotos ou vídeos relacionados ao seu serviço. Use filtros, stickers e texto para personalizar.\n\nPasso 5: Call to Action\nNão esqueça de incluir uma chamada para ação poderosa! Peça aos seguidores que curtam, compartilhem e comentem.\n\nPasso 6: Agende e Compartilhe\nEscolha a data e hora ideais para postar. Você pode compartilhar diretamente no Instagram ou agendar o post.\n\nPasso 7: Analise o Desempenho\nApós a publicação, acompanhe as métricas de desempenho da postagem na Criaty. Ajuste suas estratégias conforme necessário.\n\nAgora que você sabe como criar um carrossel incrível com a Criaty, mãos à obra e arrase no Instagram! Até a próxima, pessoal!"
}
`;
};

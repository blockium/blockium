import { PostFormat, PostType } from '@criaty/model';

export const getPostTestimonialPrompt = (
  testimonial: string,
  customer: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  switch (type) {
    case 'carousel':
      return getCarouselPrompt(testimonial, customer, slidesCount, tone);
    case 'image':
      return getImagePrompt(testimonial, customer, format, tone);
    case 'video':
      return getVideoPrompt(testimonial, customer, format, tone);
  }
};

const getCarouselPrompt = (
  testimonial: string,
  customer: string,
  slidesCount: number,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a História de Sucesso/Depoimento" a seguir: "${testimonial}", dado por "${customer}" no formato de carrossel, com ${slidesCount} slides.

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
  "title": "Experiência Única na Clínica Elegance",
  "description": "Descubra como o atendimento na Clínica Elegance é incomparável e especial. Venha fazer parte da nossa história de sucesso!",
  "hashtags": "#AtendimentoElegance #ExperiênciaÚnica #CuidadoEspecial #HistóriaDeSucesso #BemEstar",
  "format": "feed",
  "type": "carousel",
  "typeDescription": [
    "Slide 1: Julia Roberts (@juliaroberts) compartilha sua experiência única conosco:",
    "Slide 2: 'O atendimento na clínica Elegance é único e especial.'",
    "Slide 3: Conheça a Clínica Elegance!",
    "Slide 4: Nossa equipe dedicada está aqui para você.",
    "Slide 5: Cada cliente é tratado com atenção e carinho.",
    "Slide 6: Na Clínica Elegance, você é mais do que um cliente.",
    "Slide 7: Nosso compromisso é proporcionar cuidado excepcional.",
    "Slide 8: Venha fazer parte da nossa família Elegance!"
  ]
}
`;
};

const getImagePrompt = (
  testimonial: string,
  customer: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a História de Sucesso/Depoimento" a seguir: "${testimonial}", dado por "${customer}" no formato de imagem para ${format}.

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
  "title": "Experiência Única na Clínica Elegance",
  "description": "Julia Roberts compartilha como o atendimento na clínica Elegance é verdadeiramente especial. Confira!",
  "hashtags": "#EleganceClinica #AtendimentoExclusivo #JuliaRoberts #CuidadosComAPele #Depoimento",
  "format": "${format}",
  "type": "image",
  "typeDescription": "A imagem apresenta uma foto sorridente de Julia Roberts (@juliaroberts) ao lado do logotipo da Clínica Elegance, transmitindo sua mensagem de atendimento excepcional: 'O atendimento na clínica Elegance é único e especial'"
}
`;
};

const getVideoPrompt = (
  testimonial: string,
  customer: string,
  format: PostFormat,
  tone?: string,
) => {
  const tonePrompt = tone ? `Use um tom de voz "${tone}".` : '';

  return `
Crie um post para Instagram com o objetivo de "Divulgar a História de Sucesso/Depoimento" a seguir: "${testimonial}", dado por "${customer}" no formato de vídeo para ${format}.

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
  "title": "Experiência Única na Clínica Elegance",
  "description": "O atendimento na clínica Elegance é único e especial. Descubra como a Julia Roberts (@juliaroberts) se sentiu cuidada e renovada!",
  "hashtags": "#ClínicaElegance #AtendimentoEspecial #CuidadoPessoal #HistóriaDeSucesso #JuliaRoberts",
  "format": "${format}",
  "type": "video",
  "typeDescription": "Neste vídeo, vamos destacar a história de sucesso da nossa cliente Julia Roberts (@juliaroberts) na Clínica Elegance. Siga este roteiro para criar o vídeo perfeito:\n\n1. Introdução: Mostre imagens da clínica, da equipe e de tratamentos sendo realizados.\n\n2. Depoimento: Use cortes curtos do depoimento de Julia Roberts. Legendas podem ser usadas para realçar suas palavras.\n\n3. Antes e depois: Mostre fotos de Julia antes de receber os tratamentos da clínica e depois, realçando a diferença.\n\n4. Cena do atendimento: Mostre um momento de Julia recebendo um tratamento enquanto sorri e relaxa.\n\n5. Mensagem da clínica: Mostre o logo da Clínica Elegance e uma mensagem de agradecimento por fazer parte da jornada de beleza de Julia.\n\n6. Chamada para ação: Convide os seguidores a agendarem seus próprios tratamentos na Clínica Elegance para uma experiência única.\n\nLembre-se de usar trilha sonora suave e animada para dar o tom certo ao vídeo. Vamos compartilhar histórias de sucesso juntos! #ClínicaElegance"
}
`;
};

import { Post } from '@criaty/model-types';

type Answer =
  | Omit<Post, 'date' | 'params' | 'status' | 'createdAt' | 'deletedAt'>
  | string;

const FAKE_ANSWERS: Answer[] = [
  {
    title: 'Planeje posts incríveis com Assistente Inteligente!',
    description:
      'Economize tempo precioso com nosso serviço de assistente inteligente para planejar posts incríveis para seu Instagram!',
    hashtags:
      '#planejamentodeposts #assistenteinteligente #instagrammarketing #economizetempo #postsincríveis',
    format: 'feed',
    type: 'carousel',
    typeDescription:
      'Slide 1: Planeje posts incríveis para o seu Instagram!\nSlide 2: Não perca mais tempo pensando em ideias para postagens.\nSlide 3: Nosso assistente inteligente vai te ajudar a criar conteúdo relevante.\nSlide 4: Economize tempo e foque no que é mais importante para o seu negócio.\nSlide 5: Aproveite nosso serviço e tenha posts incríveis no seu feed.\nSlide 6: O planejamento de posts nunca foi tão fácil.\nSlide 7: Conte com a nossa expertise em marketing digital.\nSlide 8: Tenha um feed organizado e atrativo para seus seguidores.\nSlide 9: Aumente o engajamento e alcance do seu perfil no Instagram.\nSlide 10: Experimente agora nosso serviço de assistente inteligente!',
  },
  {
    title: 'Unhas de Gel: Durabilidade e Elegância',
    description:
      'Descubra a durabilidade das unhas de gel e tenha mãos impecáveis por semanas! Agende já o seu horário!',
    hashtags: '#UnhasDeGel #Durabilidade #Elegância #MãosPerfeitas #Beleza',
    format: 'feed',
    type: 'carousel',
    typeDescription:
      'Slide 1: Unhas de gel são perfeitas para quem busca durabilidade e elegância. 💅✨\nSlide 2: Com as unhas de gel, você não precisa se preocupar com lascas ou descamações. 😍\nSlide 3: Tenha mãos impecáveis por semanas com as unhas de gel. 💪💅\nSlide 4: A durabilidade das unhas de gel é surpreendente! Garanta um visual intacto por mais tempo. 😉\nSlide 5: Com as unhas de gel, você pode realizar todas as tarefas do dia a dia sem se preocupar com danos. 💪💅\nSlide 6: Não deixe suas unhas te impedirem de aproveitar a vida. Experimente a durabilidade das unhas de gel. 💅✨\nSlide 7: As unhas de gel apresentam alta resistência, o que garante longa duração do esmalte. 💅😍\nSlide 8: Chega de perder tempo fazendo retoques constantes! Com as unhas de gel, você economiza tempo e dinheiro. 💸⏰\nSlide 9: Valorize suas mãos e tenha unhas lindas e perfeitas com a durabilidade das unhas de gel. 💅✨\nSlide 10: Agende agora mesmo o conforto e a durabilidade das unhas de gel. Garanta unhas impecáveis por semanas! 💪💅',
  },
  {
    title: 'Picanha na chapa com 20% de desconto!',
    description:
      'Aproveite a promoção de hoje e venha saborear a melhor picanha na chapa da região com um super desconto de 20%! Não perca essa oportunidade!',
    hashtags: '#PicanhaNaChapa #Desconto #Sabor #Promocao #Restaurante',
    format: 'feed',
    type: 'image',
    typeDescription:
      "A imagem destaca uma suculenta porção de picanha na chapa com legenda '20% OFF'. Venha experimentar!",
  },
  {
    title: 'Aproveite nossa promoção de Micropigmentação Labial!',
    description:
      'Valorize seu sorriso com lábios perfeitos e ainda ganhe uma massagem facial relaxante! Agende já!',
    hashtags:
      '#micropigmentaçãolabial #lábiosperfeitos #massagemfacial #belezafeminina #promoçãoespecial',
    format: 'feed',
    type: 'image',
    typeDescription:
      'A imagem mostra lábios perfeitamente pigmentados e uma mulher relaxando durante a massagem facial.',
  },
  {
    title: 'Economize tempo precioso!',
    description:
      'Planejar posts incríveis para seu Instagram nunca foi tão fácil! Conheça nosso Assistente Inteligente e otimize seu tempo. Experimente agora!',
    hashtags:
      '#AssistenteIntelignete #PlanejarPosts #EconomizeTempo #IncrementeSeuInstagram #Facilidade',
    format: 'story',
    type: 'video',
    typeDescription:
      'Roteiro do vídeo: 1. Cena inicial: Mostrar alguém cheio de tarefas e sem tempo para planejar posts.\n2. Transição para a nossa plataforma: Demonstração da interface intuitiva e eficiente.\n3. Destacar recursos: Agendamento automático, sugestões de conteúdo personalizadas, análise de desempenho.\n4. Mostrar a pessoa tranquila e satisfeita com os resultados.\n5. Chamada para ação: Experimente agora e economize tempo! Acesse o link na bio.\n6. Logotipo e informações de contato.',
  },
  {
    title: 'Desenvolva seus projetos React de forma profissional com Blockium',
    description:
      'Transforme sua forma de desenvolver projetos React com a solução completa oferecida pela Blockium. Agilidade, eficiência e qualidade garantidos!',
    hashtags:
      '#React #DesenvolvimentoWeb #Blockium #SolucaoCompleta #Agilidade',
    format: 'reels',
    type: 'video',
    typeDescription:
      'Roteiro do vídeo:\n\n1. Cena inicial: Mostrar alguém frustrado e com dificuldades no desenvolvimento de projetos React.\n2. Transição para a plataforma da Blockium: Demonstração da interface intuitiva e de fácil utilização.\n3. Destacar recursos: Bibliotecas prontas, componentes reutilizáveis, templates pré-configurados.\n4. Mostrar a pessoa com um sorriso de satisfação e confiança.\n5. Chamada para ação: Experimente agora e eleve seu desenvolvimento React para outro nível!\n6. Logotipo e informações de contato.',
  },
  {
    title: 'Solução Completa para Desenvolvimento React',
    description:
      'Descubra como o Blockium pode facilitar o seu desenvolvimento React! Veja os slides para mais informações.',
    hashtags: '#Blockium #DesenvolvimentoReact #SolucaoCompleta',
    format: 'feed',
    type: 'carousel',
    typeDescription:
      'Slide 1: Simplifique seu desenvolvimento React com o Blockium!\nSlide 2: Ferramentas poderosas para construir interfaces incríveis.\nSlide 3: Componentes reutilizáveis para acelerar o seu workflow.\nSlide 4: Integração perfeita com bibliotecas populares como React Router e Redux.\nSlide 5: Aumente sua produtividade e entregue projetos de alta qualidade com o Blockium!',
  },
  {
    title: 'Solução completa para desenvolvimento React',
    description:
      'Conheça o Blockium, a solução completa para o desenvolvimento React. Com ele, você pode criar aplicativos web de forma rápida e eficiente, garantindo a melhor experiência para seus usuários. Experimente agora!',
    hashtags:
      '#Blockium #React #DesenvolvimentoWeb #ExperiênciaDoUsuário #Eficiência',
    format: 'story',
    type: 'image',
    typeDescription:
      'Imagem ilustrativa de um computador com o editor de código aberto do React, mostrando simplicidade e praticidade na criação de aplicativos web.',
  },
];

export const fakeAnswer = () => {
  const index = Math.floor(Math.random() * FAKE_ANSWERS.length);
  const data = FAKE_ANSWERS[index];
  return { data };
};

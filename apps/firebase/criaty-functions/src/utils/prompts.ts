import { User } from '@postgpt/types';

export const getPostsPrompt = async (
  user: User,
  postQuantity: number,
  topic?: string,
  character?: string,
) => {
  const businessDescription =
    user.business?.description ?? 'Prestador de serviço';

  const businessServices = user.business?.services ?? 'Serviços genéricos';

  const topicPrompt = topic ? `Aborde o tema "${topic}".` : '';

  const characterPrompt = character
    ? `falando como se fosse "${character}",`
    : '';

  const language = 'portugues';

  const postQuantityDescription = `${postQuantity} ${
    postQuantity > 1 ? 'posts' : 'único post'
  }`;

  const prompt = `
Sendo criativo, crie ${postQuantityDescription} para Instagram, em ${language}, ${characterPrompt} para um negócio de "${businessDescription}" que oferece:

"${businessServices}".

${topicPrompt}

Cada post deve ter:
1. título
2. descrição máximo 200 caracteres
3. cinco hashtags
4. format: stories, reels ou feed
5. type: video, carousel ou image (em inglês), de acordo com o format acima
6. descrição máximo 200 caracteres, de como criar o video, carousel ou image definido no item "5. type"

Exemplo:
[
  {
    "title": "Desperte a diva em você!",
    "description": "Deixe sua autoestima nas mãos da nossa equipe especializada em técnicas europeias de beleza. Unhas de gel, micropigmentação de sobrancelhas e lábios, tratamentos para pele, design de sobrancelha, lash lift, brow lamination e spa para os pés são alguns dos nossos serviços disponíveis.",
    "hashtags": "#esteticariodejaneiro #autocuidado #autoestima #belezainterior #belezanatural",
    "format": "storie",
    "type": "video",
    "typeDescription": "O vídeo começa com imagens cativantes de um ambiente luxuoso e convidativo. A narração destaca a equipe especializada em técnicas europeias de beleza, enquanto cenas detalhadas mostram unhas de gel perfeitas, micropigmentação impecável de sobrancelhas e lábios, tratamentos faciais revigorantes e design de sobrancelhas precisas. O vídeo enfatiza a dedicação da equipe e a qualidade dos serviços, encorajando os espectadores a confiarem sua autoestima nas mãos dos especialistas."
  }
]

O resultado deve vir num único JSON array.`;

  return prompt;
};

export const getWeeklyPostsPrompt = async (user: User) => {
  const businessDescription =
    user.business?.description ?? 'Prestador de serviço';

  const businessServices = user.business?.services ?? 'Serviços genéricos';

  const prompt = `Crie um calendário editorial de postagem para o Instagram para "${businessDescription}" que oferece produtos/serviços de:

    ${businessServices}

    O calendário deve ser para todos os dias da semana (Segunda a Domingo)

    Cada postagem deve ter:
    1: título da postagem 
    2: descrição, entre 200-400 caracteres
    3: hastags
    4: formato da postagem (feed, story ou reels)
    5: tipo:
       imagem ou carrossel ou vídeo, se o formato da postagem = feed; 
       imagem ou video, se o formato da postagem for story; 
       video se o formato da postagem for reels;
    6: descrição da imagem, carrossel ou vídeo
    
    Exemplo:
    [SEG]
    1: Texto do título
    2: Texto da descrição
    3: Lista das hashtags
    4: Feed, Stories ou Reels
    5: Imagem, Carrossel ou Vídeo
    6: Descrição da imagem, carrossel ou vídeo
    `;

  return prompt;
};

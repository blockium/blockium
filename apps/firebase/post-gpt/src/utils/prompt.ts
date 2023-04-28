export const getWeeklyPostsPrompt = async (userId: string) => {
  // TODO: Get businessDescription, businessServices from Firebase
  const businessDescription =
    'Clínica de estética no Rio de Janeiro com técnica europeia que transforma a autoestima dos clientes.';

  const businessServices = `- unhas de gel
    - micropigmentação de sobrancelhas
    - micropigmentação de lábios
    - tratamento para pele
    - design de sobrancelha
    - lash lift
    - brow lamination
    - spa dos pés`;

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

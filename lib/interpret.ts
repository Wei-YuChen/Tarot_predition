import type { Card, DrawnCard } from './types';

export function interpretCard(card: Card, isReversed: boolean, locale: string = 'en'): string {
  const meaning = isReversed ? card.meaningReversed : card.meaning;
  const cardName = getCardName(card, locale);
  const position = isReversed ? 'reversed' : 'upright';
  
  // For now, return English interpretation. TODO: Implement full multi-language support
  if (locale === 'zh') {
    return `${cardName}（${isReversed ? '逆位' : '正位'}）：${meaning}`;
  }
  
  return `${cardName} (${position}): ${meaning}`;
}

export function getCardName(card: Card, locale: string = 'en'): string {
  if (locale === 'en' || !card.nameTranslations) {
    return card.name;
  }
  
  return card.nameTranslations[locale] || card.name;
}

export function buildSpreadSummary(spread: DrawnCard[], locale: string = 'en'): string {
  if (spread.length === 0) return '';
  
  const interpretations = spread.map(drawnCard => {
    const positionName = getPositionName(drawnCard.position, locale);
    const cardInterpretation = interpretCard(drawnCard.card, drawnCard.isReversed, locale);
    
    return `${positionName}: ${cardInterpretation}`;
  });
  
  if (locale === 'zh') {
    return `您的塔罗牌阅读结果：\n\n${interpretations.join('\n\n')}`;
  }
  
  return `Your Tarot Reading:\n\n${interpretations.join('\n\n')}`;
}

export function getPositionName(position: any, locale: string = 'en'): string {
  if (locale === 'en' || !position.nameTranslations) {
    return position.name;
  }
  
  return position.nameTranslations[locale] || position.name;
}

export function getPositionDescription(position: any, locale: string = 'en'): string {
  if (locale === 'en' || !position.descriptionTranslations) {
    return position.description;
  }
  
  return position.descriptionTranslations[locale] || position.description;
}

export function generateReadingPrompt(
  question: string | undefined,
  spread: DrawnCard[],
  locale: string = 'en'
): string {
  const questionText = question ? `Question: ${question}\n\n` : '';
  const spreadText = spread.map(drawnCard => {
    const positionName = getPositionName(drawnCard.position, locale);
    const cardName = getCardName(drawnCard.card, locale);
    const positionDesc = drawnCard.isReversed ? 'reversed' : 'upright';
    
    return `${positionName}: ${cardName} (${positionDesc})`;
  }).join('\n');
  
  const languageInstruction = getLanguageInstruction(locale);
  
  return `${questionText}Tarot Spread:\n${spreadText}\n\n${languageInstruction}`;
}

function getLanguageInstruction(locale: string): string {
  const instructions: Record<string, string> = {
    zh: '请用中文回答，约200-300字。',
    es: 'Por favor responde en español, aproximadamente 200-300 palabras.',
    fr: 'Veuillez répondre en français, environ 200-300 mots.',
    de: 'Bitte antworten Sie auf Deutsch, etwa 200-300 Wörter.',
    id: 'Tolong jawab dalam Bahasa Indonesia, sekitar 200-300 kata.',
    vi: 'Vui lòng trả lời bằng tiếng Việt, khoảng 200-300 từ.',
    th: 'กรุณาตอบเป็นภาษาไทย ประมาณ 200-300 คำ',
    ja: '日本語で200-300文字程度で回答してください。',
    ko: '한국어로 200-300단어 정도로 답변해주세요.',
    'pt-BR': 'Por favor responda em português brasileiro, aproximadamente 200-300 palavras.',
    'pt-PT': 'Por favor responda em português, aproximadamente 200-300 palavras.',
    it: 'Si prega di rispondere in italiano, circa 200-300 parole.',
    ru: 'Пожалуйста, ответьте на русском языке, примерно 200-300 слов.',
    tr: 'Lütfen Türkçe olarak 200-300 kelime civarında cevap verin.',
    ar: 'يرجى الإجابة باللغة العربية، حوالي 200-300 كلمة.',
    hi: 'कृपया हिंदी में लगभग 200-300 शब्दों में उत्तर दें।',
    fil: 'Mangyaring sumagot sa Filipino, humigit-kumulang 200-300 salita.',
    ms: 'Sila jawab dalam Bahasa Malaysia, kira-kira 200-300 perkataan.',
    pl: 'Proszę odpowiedzieć po polsku, około 200-300 słów.'
  };
  
  return instructions[locale] || 'Please respond in English, approximately 200-300 words.';
}
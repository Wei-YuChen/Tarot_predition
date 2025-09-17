import { NextRequest, NextResponse } from 'next/server';

interface CardData {
  name: string;
  meaning: string;
  isReversed: boolean;
  position: string;
}

interface RequestBody {
  locale: string;
  question: string;
  cards: CardData[];
  min_tokens?: number;
  mode?: 'compact' | 'standard' | 'long';
  target_chars?: number;
  target_words?: number;
}

// Default minimum tokens for Deep Analysis
const DEFAULT_MIN_TOKENS = 350;

// Demo responses for when OpenAI is not available
const demoResponses = {
  en: `**Background & Overall Trends**

Based on your cards, I see a powerful narrative unfolding in your life. The energies present indicate a significant phase of transformation where past experiences, current challenges, and future possibilities are all interconnected in a meaningful way. The universe is presenting you with a clear path forward, though it requires both inner wisdom and practical action.

**Card One Analysis**

The Past/Present reveals the foundation of your current situation, suggesting that past experiences have shaped your current perspective and given you valuable wisdom to draw upon. This card indicates that you have already developed important skills and insights that are directly relevant to your current question. The energy here speaks to strength gained through experience and the importance of honoring what you have learned.

**Card Two Analysis**

The Obstacle/Lesson card indicates challenges that are actually opportunities for growth. What may seem like a setback is actually the universe's way of teaching you important lessons and building your inner strength. This card suggests that the difficulties you face are not permanent barriers but rather stepping stones to greater understanding and capability. Pay attention to what this challenge is trying to teach you.

**Card Three Analysis**

The Advice/Direction card points toward a path forward that honors both your intuition and practical wisdom. Trust in your abilities while remaining open to new possibilities and perspectives. This card indicates that you have the tools and wisdom needed to navigate your situation successfully, but you must be willing to take action based on what you know to be true.

**Synthesis**

Together, these cards suggest a time of transition and growth where your past wisdom meets present challenges to create future opportunities. Embrace the lessons from your past, face current challenges with courage, and move forward with confidence in your own power to create positive change. The path ahead requires both inner reflection and outer action, but you have the strength and wisdom needed to navigate this situation successfully.`,

  zh: `**问题背景与整体趋势**

根据你的牌卡，我看到了你生活中正在展开的强大叙事。当前的能量表明你正处在一个重要的转变阶段，过去的经历、当前的挑战和未来的可能性都以有意义的方式相互连接。宇宙正在为你呈现一条清晰的前进道路，尽管这需要内在智慧和实际行动。

**卡牌一分析**

过去/现在揭示了你当前状况的基础，表明过去的经历塑造了你当前的观点，并给了你宝贵的智慧可以借鉴。这张牌表明你已经培养了与当前问题直接相关的重要技能和洞察力。这里的能量说明通过经验获得的力量以及尊重你所学到的东西的重要性。

**卡牌二分析**

障碍/课题牌指出挑战实际上是成长的机会。看似是挫折的实际上是宇宙教导你重要课程和建立内在力量的方式。这张牌表明你面临的困难不是永久的障碍，而是通往更大理解和能力的垫脚石。请注意这个挑战试图教给你什么。

**卡牌三分析**

建议/方向牌指向一条既尊重你的直觉又尊重实用智慧的前进道路。相信自己的能力，同时保持对新可能性和观点的开放。这张牌表明你拥有成功应对情况所需的工具和智慧，但你必须愿意基于你知道的真理采取行动。

**综合解读**

这些牌卡一起表明这是一个转变和成长的时期，你过去的智慧与当前的挑战相遇，创造未来的机会。拥抱过去的教训，勇敢面对当前的挑战，以对自己创造积极变化能力的信心向前迈进。前方的道路需要内在反思和外在行动，但你拥有成功应对这种情况所需的力量和智慧。`,

  tw: `**問題背景與整體趨勢**

根據你的牌卡，我看到了你生活中正在展開的強大敘事。當前的能量表明你正處在一個重要的轉變階段，過去的經歷、當前的挑戰和未來的可能性都以有意義的方式相互連接。宇宙正在為你呈現一條清晰的前進道路，儘管這需要內在智慧和實際行動。

**卡牌一分析**

過去/現在揭示了你當前狀況的基礎，表明過去的經歷塑造了你當前的觀點，並給了你寶貴的智慧可以借鑒。這張牌表明你已經培養了與當前問題直接相關的重要技能和洞察力。這裡的能量說明通過經驗獲得的力量以及尊重你所學到的東西的重要性。

**卡牌二分析**

障礙/課題牌指出挑戰實際上是成長的機會。看似是挫折的實際上是宇宙教導你重要課程和建立內在力量的方式。這張牌表明你面臨的困難不是永久的障礙，而是通往更大理解和能力的墊腳石。請注意這個挑戰試圖教給你什麼。

**卡牌三分析**

建議/方向牌指向一條既尊重你的直覺又尊重實用智慧的前進道路。相信自己的能力，同時保持對新可能性和觀點的開放。這張牌表明你擁有成功應對情況所需的工具和智慧，但你必須願意基於你知道的真理採取行動。

**綜合解讀**

這些牌卡一起表明這是一個轉變和成長的時期，你過去的智慧與當前的挑戰相遇，創造未來的機會。擁抱過去的教訓，勇敢面對當前的挑戰，以對自己創造積極變化能力的信心向前邁進。前方的道路需要內在反思和外在行動，但你擁有成功應對這種情況所需的力量和智慧。`,
};

// Compact demo responses for when OpenAI is not available
const compactDemoResponses = {
  en: `Opening: Your cards reveal a transformative period where past wisdom meets present challenges to shape future opportunities. Card One: Past experiences have equipped you with valuable insights that directly apply to your current situation. Card Two: Current obstacles are actually growth opportunities designed to build your inner strength. Card Three: The path forward requires balancing intuition with practical action. Summary: Trust your accumulated wisdom, embrace challenges as teachers, and take confident action toward positive change.`,

  zh: `开篇：牌卡显示你正处于转变期，过去智慧与当前挑战相遇，塑造未来机遇。卡牌一：过去经历赋予你宝贵洞察，直接适用于当前情况。卡牌二：当前障碍实为成长机会，旨在建立内在力量。卡牌三：前路需平衡直觉与实际行动。综合：相信积累的智慧，拥抱挑战为师，满怀信心地采取积极行动。`,

  tw: `開篇：牌卡顯示你正處於轉變期，過去智慧與當前挑戰相遇，塑造未來機遇。卡牌一：過去經歷賦予你寶貴洞察，直接適用於當前情況。卡牌二：當前障礙實為成長機會，旨在建立內在力量。卡牌三：前路需平衡直覺與實際行動。綜合：相信積累的智慧，擁抱挑戰為師，滿懷信心地採取積極行動。`,
};

async function generateOpenAIAnalysis(body: RequestBody): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('No OpenAI API key');
  }

  const mode = body.mode || 'standard';
  const minTokens = body.min_tokens || DEFAULT_MIN_TOKENS;

  let systemPrompt: string;
  let maxTokens: number;
  let temperature: number;
  let frequencyPenalty: number;

  if (mode === 'compact') {
    // Compact mode settings
    temperature = 0.5;
    frequencyPenalty = 0.25;

    if (body.locale === 'zh') {
      const targetChars = body.target_chars || 400;
      maxTokens = Math.min(520, Math.round(targetChars * 1.3));
      systemPrompt = `你是一位经验丰富的塔罗牌阅读师。基于提供的三张牌卡和它们的位置，提供一个简洁、实用的综合分析。请用中文回答，语气要神秘但实用，专注于实际指导。

目标约${targetChars}字符（±10%），绝对不能超过450字符。必须按照以下结构，每个部分1-2句话：
开篇：整体趋势概述
卡牌一：${body.cards[0]?.position}牌的核心含义
卡牌二：${body.cards[1]?.position}牌的核心含义  
卡牌三：${body.cards[2]?.position}牌的核心含义
综合：连接三张牌，提供具体建议

使用内联标签如"开篇："、"卡牌一："、"卡牌二："、"卡牌三："、"综合："，避免Markdown标题和列表，避免emoji，简洁明了无冗词。`;
    } else if (body.locale === 'tw') {
      const targetChars = body.target_chars || 400;
      maxTokens = Math.min(520, Math.round(targetChars * 1.3));
      systemPrompt = `你是一位經驗豐富的塔羅牌閱讀師。基於提供的三張牌卡和它們的位置，提供一個簡潔、實用的綜合分析。請用繁體中文回答，語氣要神秘但實用，專注於實際指導。

目標約${targetChars}字符（±10%），絕對不能超過450字符。必須按照以下結構，每個部分1-2句話：
開篇：整體趨勢概述
卡牌一：${body.cards[0]?.position}牌的核心含義
卡牌二：${body.cards[1]?.position}牌的核心含義
卡牌三：${body.cards[2]?.position}牌的核心含義
綜合：連接三張牌，提供具體建議

使用內聯標籤如"開篇："、"卡牌一："、"卡牌二："、"卡牌三："、"綜合："，避免Markdown標題和列表，避免emoji，簡潔明了無冗詞。`;
    } else {
      const targetWords = body.target_words || 220;
      maxTokens = Math.min(380, Math.round(targetWords * 1.7));
      systemPrompt = `You are an experienced tarot reader. Based on the three cards provided and their positions, give a concise, practical synthesis. Respond in English with a mystical yet practical tone, focusing on actionable insights.

Target approximately ${targetWords} words (±10%), MUST NOT exceed 230 words. Follow this structure with 1-2 sentences per section:
Opening: Overall trends overview
Card One: Core meaning of the ${body.cards[0]?.position} card
Card Two: Core meaning of the ${body.cards[1]?.position} card
Card Three: Core meaning of the ${body.cards[2]?.position} card
Summary: Connect all three cards and provide specific advice

Use inline labels like "Opening:", "Card One:", "Card Two:", "Card Three:", "Summary:". Avoid markdown headers/lists, avoid emojis, be concise without redundancy.`;
    }
  } else {
    // Standard mode (preserve existing behavior)
    temperature = 0.7;
    frequencyPenalty = 0;
    maxTokens = Math.max(800, minTokens * 2);

    systemPrompt =
      body.locale === 'zh'
        ? `你是一位经验丰富的塔罗牌阅读师。基于提供的三张牌卡和它们的位置，提供一个深入、实用的综合分析。请用中文回答，语气要神秘但实用，专注于实际指导。

必须按照以下结构提供至少${minTokens}字的分析：
1. 问题背景与整体趋势（1-2段）
2. 卡牌一：详细解释第一张牌的含义和在当前情境中的作用
3. 卡牌二：详细解释第二张牌的含义和在当前情境中的作用  
4. 卡牌三：详细解释第三张牌的含义和在当前情境中的作用
5. 综合解读：将三张牌连接起来，提供具体可行的建议

确保每个部分都详细展开，提供深入的洞察和实用的指导。`
        : body.locale === 'tw'
          ? `你是一位經驗豐富的塔羅牌閱讀師。基於提供的三張牌卡和它們的位置，提供一個深入、實用的綜合分析。請用繁體中文回答，語氣要神秘但實用，專注於實際指導。

必須按照以下結構提供至少${minTokens}字的分析：
1. 問題背景與整體趨勢（1-2段）
2. 卡牌一：詳細解釋第一張牌的含義和在當前情境中的作用
3. 卡牌二：詳細解釋第二張牌的含義和在當前情境中的作用
4. 卡牌三：詳細解釋第三張牌的含義和在當前情境中的作用
5. 綜合解讀：將三張牌連接起來，提供具體可行的建議

確保每個部分都詳細展開，提供深入的洞察和實用的指導。`
          : `You are an experienced tarot reader. Based on the three cards provided and their positions, give a deep, practical synthesis. Respond in English with a mystical yet practical tone, focusing on actionable insights.

You must provide an analysis of at least ${minTokens} tokens following this structure:
1. Background & Overall Trends (1-2 paragraphs)
2. Card One: Detailed explanation of the first card's meaning and role in the current situation
3. Card Two: Detailed explanation of the second card's meaning and role in the current situation
4. Card Three: Detailed explanation of the third card's meaning and role in the current situation
5. Synthesis: Connect all three cards together and provide specific, actionable advice

Ensure each section is thoroughly developed with deep insights and practical guidance.`;
  }

  const userPrompt =
    body.locale === 'zh'
      ? `问题: "${body.question}"

牌卡:
${body.cards.map((card, i) => `${i + 1}. ${card.position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${card.meaning}`).join('\n')}

请按照系统提示中的结构，提供一个${mode === 'compact' ? '简洁而' : '全面深入的'}分析。每张牌都必须单独${mode === 'compact' ? '简要' : '详细'}解释，然后提供综合解读。确保分析${mode === 'compact' ? '简洁实用' : '足够详细和实用'}。`
      : body.locale === 'tw'
        ? `問題: "${body.question}"

牌卡:
${body.cards.map((card, i) => `${i + 1}. ${card.position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${card.meaning}`).join('\n')}

請按照系統提示中的結構，提供一個${mode === 'compact' ? '簡潔而' : '全面深入的'}分析。每張牌都必須單獨${mode === 'compact' ? '簡要' : '詳細'}解釋，然後提供綜合解讀。確保分析${mode === 'compact' ? '簡潔實用' : '足夠詳細和實用'}。`
        : `Question: "${body.question}"

Cards:
${body.cards.map((card, i) => `${i + 1}. ${card.position}: ${card.name} (${card.isReversed ? 'Reversed' : 'Upright'}) - ${card.meaning}`).join('\n')}

Please follow the structure outlined in the system prompt to provide a ${mode === 'compact' ? 'concise yet' : 'comprehensive, in-depth'} analysis. Each card must be explained individually in ${mode === 'compact' ? 'brief' : 'detail'}, followed by a synthesis. Ensure the analysis is ${mode === 'compact' ? 'concise and practical' : 'thorough and practical'}.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: maxTokens,
      temperature: temperature,
      frequency_penalty: frequencyPenalty,
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Unable to generate analysis.';
}

function getDemoAnalysis(
  locale: string,
  question: string,
  cards: CardData[],
  minTokens: number = DEFAULT_MIN_TOKENS,
  mode: string = 'standard'
): string {
  const isCompact = mode === 'compact';
  const responses = isCompact ? compactDemoResponses : demoResponses;
  const baseResponse =
    responses[locale as keyof typeof responses] || responses.en;

  // Add some personalization based on the question and cards
  const cardNames = cards.map((c) => c.name).join(', ');

  if (isCompact) {
    // For compact mode, keep the intro very brief
    const personalizedIntro =
      locale === 'zh'
        ? `关于"${question}"的问题，${cardNames}这些牌卡带来洞察。`
        : locale === 'tw'
          ? `關於"${question}"的問題，${cardNames}這些牌卡帶來洞察。`
          : `Regarding "${question}", the cards ${cardNames} provide insights.`;

    return personalizedIntro + ' ' + baseResponse;
  } else {
    // Standard mode with longer intro
    const personalizedIntro =
      locale === 'zh'
        ? `关于"${question}"的问题，${cardNames}这些牌卡为你带来了深刻的洞察。\n\n`
        : locale === 'tw'
          ? `關於"${question}"的問題，${cardNames}這些牌卡為你帶來了深刻的洞察。\n\n`
          : `Regarding your question about "${question}", the cards ${cardNames} bring profound insights.\n\n`;

    return personalizedIntro + baseResponse;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    // Validate request
    if (!body.question || !body.cards || body.cards.length === 0) {
      return NextResponse.json(
        { error: 'Missing question or cards' },
        { status: 400 }
      );
    }

    const minTokens = body.min_tokens || DEFAULT_MIN_TOKENS;
    const mode = body.mode || 'standard';
    let analysis: string;

    try {
      // Try OpenAI first
      analysis = await generateOpenAIAnalysis(body);
    } catch (error) {
      console.log('OpenAI not available, using demo response:', error);
      // Fall back to demo response
      analysis = getDemoAnalysis(
        body.locale,
        body.question,
        body.cards,
        minTokens,
        mode
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Deep analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

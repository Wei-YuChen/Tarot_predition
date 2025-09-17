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
}

// Demo responses for when OpenAI is not available
const demoResponses = {
  en: `Based on your cards, I see a powerful narrative unfolding in your life. 

The Past/Present reveals the foundation of your current situation, suggesting that past experiences have shaped your current perspective and given you valuable wisdom to draw upon.

The Obstacle/Lesson card indicates challenges that are actually opportunities for growth. What may seem like a setback is actually the universe's way of teaching you important lessons and building your inner strength.

The Advice/Direction card points toward a path forward that honors both your intuition and practical wisdom. Trust in your abilities while remaining open to new possibilities and perspectives.

Together, these cards suggest a time of transition and growth. Embrace the lessons from your past, face current challenges with courage, and move forward with confidence in your own power to create positive change.

Remember that you have the strength and wisdom needed to navigate this situation successfully.`,

  zh: `根据你的牌卡，我看到了你生活中正在展开的强大叙事。

过去/现在揭示了你当前状况的基础，表明过去的经历塑造了你当前的观点，并给了你宝贵的智慧可以借鉴。

障碍/课题牌指出挑战实际上是成长的机会。看似是挫折的实际上是宇宙教导你重要课程和建立内在力量的方式。

建议/方向牌指向一条既尊重你的直觉又尊重实用智慧的前进道路。相信自己的能力，同时保持对新可能性和观点的开放。

这些牌卡一起表明这是一个转变和成长的时期。拥抱过去的教训，勇敢面对当前的挑战，以对自己创造积极变化能力的信心向前迈进。

记住，你拥有成功应对这种情况所需的力量和智慧。`,
};

async function generateOpenAIAnalysis(body: RequestBody): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('No OpenAI API key');
  }

  const systemPrompt =
    body.locale === 'zh'
      ? `你是一位经验丰富的塔罗牌阅读师。基于提供的三张牌卡和它们的位置，提供一个深入、实用的综合分析。请用中文回答，语气要神秘但实用，专注于实际指导。`
      : `You are an experienced tarot reader. Based on the three cards provided and their positions, give a deep, practical synthesis. Respond in English with a mystical yet practical tone, focusing on actionable insights.`;

  const userPrompt =
    body.locale === 'zh'
      ? `问题: "${body.question}"

牌卡:
${body.cards.map((card, i) => `${i + 1}. ${card.position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${card.meaning}`).join('\n')}

请提供一个综合分析，将这三张牌连接起来，回答所提出的问题。`
      : `Question: "${body.question}"

Cards:
${body.cards.map((card, i) => `${i + 1}. ${card.position}: ${card.name} (${card.isReversed ? 'Reversed' : 'Upright'}) - ${card.meaning}`).join('\n')}

Please provide a synthesis that connects these three cards to answer the question asked.`;

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
      max_tokens: 500,
      temperature: 0.7,
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
  cards: CardData[]
): string {
  const baseResponse =
    demoResponses[locale as keyof typeof demoResponses] || demoResponses.en;

  // Add some personalization based on the question and cards
  const cardNames = cards.map((c) => c.name).join(', ');
  const personalizedIntro =
    locale === 'zh'
      ? `关于"${question}"的问题，${cardNames}这些牌卡为你带来了深刻的洞察。\n\n`
      : `Regarding your question about "${question}", the cards ${cardNames} bring profound insights.\n\n`;

  return personalizedIntro + baseResponse;
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

    let analysis: string;

    try {
      // Try OpenAI first
      analysis = await generateOpenAIAnalysis(body);
    } catch (error) {
      console.log('OpenAI not available, using demo response:', error);
      // Fall back to demo response
      analysis = getDemoAnalysis(body.locale, body.question, body.cards);
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

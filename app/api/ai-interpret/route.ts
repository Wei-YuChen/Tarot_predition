import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateReadingPrompt } from '@/lib/interpret';
import type { DrawnCard } from '@/lib/types';

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { question, spread, locale = 'en' } = body;

    // Validate input
    if (!spread || !Array.isArray(spread) || spread.length === 0) {
      return NextResponse.json(
        { error: 'Invalid spread data' },
        { status: 400 }
      );
    }

    // Generate the prompt
    const userPrompt = generateReadingPrompt(question, spread as DrawnCard[], locale);

    // System prompt for the Tarot master persona
    const systemPrompt = `You are an internationally respected Tarot master with decades of experience in card reading and spiritual guidance. You have deep knowledge of traditional Tarot symbolism, numerology, and the archetypal meanings of each card.

Your reading style is:
- Insightful and compassionate
- Based on traditional Tarot meanings while being relevant to modern life
- Balanced between acknowledging challenges and highlighting opportunities
- Specific about how card positions (Past/Present/Future) relate to the querent's journey
- Always mention whether cards are upright or reversed and what this means
- Provide both analysis and actionable advice

Write a comprehensive interpretation that:
1. Addresses each card in its position
2. Explains the overall narrative of the three-card spread
3. Provides meaningful guidance and actionable advice
4. Is exactly 200-300 words
5. Maintains a mystical yet practical tone
6. References specific card names and their traditional meanings`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use the efficient mini model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500, // Ensure we don't exceed limits
    });

    const interpretation = completion.choices[0]?.message?.content;

    if (!interpretation) {
      return NextResponse.json(
        { error: 'Failed to generate interpretation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      interpretation: interpretation.trim(),
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key configuration' },
          { status: 401 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate AI interpretation' },
      { status: 500 }
    );
  }
}
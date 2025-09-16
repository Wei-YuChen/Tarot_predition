import { describe, it, expect } from 'vitest';
import { interpretCard, buildSpreadSummary } from '../lib/interpret';
import { majorArcanaCards } from '../lib/cards';
import { pastPresentFutureSpread } from '../lib/spreads';
import type { DrawnCard } from '../lib/types';

describe('interpretCard', () => {
  const foolCard = majorArcanaCards[0]; // The Fool

  it('should return upright meaning when card is not reversed', () => {
    const interpretation = interpretCard(foolCard, false);
    expect(interpretation).toContain('The Fool');
    expect(interpretation).toContain('upright');
    expect(interpretation).toContain(foolCard.meaning);
  });

  it('should return reversed meaning when card is reversed', () => {
    const interpretation = interpretCard(foolCard, true);
    expect(interpretation).toContain('The Fool');
    expect(interpretation).toContain('reversed');
    expect(interpretation).toContain(foolCard.meaningReversed);
  });

  it('should return Chinese translation when locale is zh', () => {
    const interpretation = interpretCard(foolCard, false, 'zh');
    expect(interpretation).toContain('愚者'); // Chinese name for The Fool
    expect(interpretation).toContain('正位'); // Chinese for upright
  });
});

describe('buildSpreadSummary', () => {
  it('should return empty string for empty spread', () => {
    const summary = buildSpreadSummary([]);
    expect(summary).toBe('');
  });

  it('should build a summary for a valid spread', () => {
    const drawnCards: DrawnCard[] = [
      {
        card: majorArcanaCards[0], // The Fool
        position: pastPresentFutureSpread[0], // Past
        isReversed: false
      },
      {
        card: majorArcanaCards[1], // The Magician
        position: pastPresentFutureSpread[1], // Present
        isReversed: true
      }
    ];

    const summary = buildSpreadSummary(drawnCards);
    expect(summary).toContain('Your Tarot Reading');
    expect(summary).toContain('Past');
    expect(summary).toContain('Present');
    expect(summary).toContain('The Fool');
    expect(summary).toContain('The Magician');
    expect(summary.length).toBeGreaterThan(0);
  });

  it('should build Chinese summary when locale is zh', () => {
    const drawnCards: DrawnCard[] = [
      {
        card: majorArcanaCards[0], // The Fool
        position: pastPresentFutureSpread[0], // Past
        isReversed: false
      }
    ];

    const summary = buildSpreadSummary(drawnCards, 'zh');
    expect(summary).toContain('您的塔罗牌阅读结果');
    expect(summary).toContain('过去'); // Chinese for Past
    expect(summary).toContain('愚者'); // Chinese for The Fool
  });
});
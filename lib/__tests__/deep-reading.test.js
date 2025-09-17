/**
 * Unit tests for Deep Reading utilities
 * Run with: npm test or node lib/__tests__/deep-reading.test.js
 */

// Simple test framework since no jest is configured
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function describe(name, fn) {
  console.log(`\n=== ${name} ===`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.log(`✗ ${name}: ${error.message}`);
  }
}

// Import the functions to test
const {
  isCJKLocale,
  targetBoundsFor,
  measure,
  ensureFinalConclusion,
  gentleCompress,
  formatDeepReading,
} = require('../deep-reading');

describe('Deep Reading Utilities', () => {
  it('should identify CJK locales correctly', () => {
    assert(isCJKLocale('zh') === true, 'zh should be CJK');
    assert(isCJKLocale('tw') === true, 'tw should be CJK');
    assert(isCJKLocale('ja') === true, 'ja should be CJK');
    assert(isCJKLocale('ko') === true, 'ko should be CJK');
    assert(isCJKLocale('en') === false, 'en should not be CJK');
    assert(isCJKLocale('vi') === false, 'vi should not be CJK');
  });

  it('should return correct bounds for different locales', () => {
    const cjkBounds = targetBoundsFor('zh');
    assert(cjkBounds.type === 'chars', 'CJK should use character bounds');
    assert(cjkBounds.minChars === 300, 'CJK min should be 300 chars');
    assert(cjkBounds.maxChars === 400, 'CJK max should be 400 chars');

    const enBounds = targetBoundsFor('en');
    assert(enBounds.type === 'words', 'English should use word bounds');
    assert(enBounds.minWords === 120, 'English min should be 120 words');
    assert(enBounds.maxWords === 170, 'English max should be 170 words');
  });

  it('should measure text correctly', () => {
    const text = 'Hello world! This is a test.';
    const measurement = measure(text, 'en');
    assert(measurement.chars === 29, 'Should count characters correctly');
    assert(measurement.words === 6, 'Should count words correctly');
  });

  it('should ensure proper conclusion for CJK locales', () => {
    const text = '这是一段分析文本。\n\n这是另一段文本。';
    const result = ensureFinalConclusion('zh', text);
    assert(result.includes('綜合結論：'), 'Should have CJK conclusion prefix');
  });

  it('should ensure proper conclusion for English', () => {
    const text = 'This is analysis text.\n\nThis is another paragraph.';
    const result = ensureFinalConclusion('en', text);
    assert(result.includes('Overall conclusion:'), 'Should have English conclusion prefix');
  });

  it('should preserve existing conclusion', () => {
    const text = 'This is text.\n\nOverall conclusion: This is already a conclusion.';
    const result = ensureFinalConclusion('en', text);
    assert(result.endsWith('Overall conclusion: This is already a conclusion.'), 'Should preserve existing conclusion');
  });

  it('should format complete deep reading for CJK', () => {
    const longText = '這是一個很長的分析文本。' + '這包含很多細節和解釋。'.repeat(20);
    const result = formatDeepReading('zh', longText);
    
    const measurement = measure(result, 'zh');
    assert(measurement.chars >= 300, 'Should meet minimum character count');
    assert(measurement.chars <= 400, 'Should not exceed maximum character count');
    assert(result.includes('綜合結論：'), 'Should have proper conclusion');
  });

  it('should format complete deep reading for English', () => {
    const longText = 'This is a very long analysis text. '.repeat(50) + 'This contains many details and explanations.';
    const result = formatDeepReading('en', longText);
    
    const measurement = measure(result, 'en');
    assert(measurement.words >= 120, 'Should meet minimum word count');
    assert(measurement.words <= 170, 'Should not exceed maximum word count');
    assert(result.includes('Overall conclusion:'), 'Should have proper conclusion');
  });

  it('should handle short text by preserving it', () => {
    const shortText = 'Short analysis. Brief conclusion.';
    const result = formatDeepReading('en', shortText);
    assert(result.includes('Overall conclusion:'), 'Should still add conclusion to short text');
  });

  it('should compress content while preserving conclusion', () => {
    const bounds = targetBoundsFor('en');
    const longText = 'This is really very quite rather extremely long content with many unnecessary filler words. ' +
                     'I think perhaps this might be too verbose and could benefit from compression. ' +
                     'You know, it seems like we have way too much text here! ' +
                     'This is the conclusion paragraph that should be preserved.';
    
    const compressed = gentleCompress(longText, 'en', bounds);
    assert(compressed.length < longText.length, 'Should reduce text length');
    assert(compressed.includes('conclusion paragraph'), 'Should preserve conclusion content');
  });
});

console.log('\n=== Running Deep Reading Tests ===');
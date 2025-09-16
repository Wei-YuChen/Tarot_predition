import type { Reading, DailyLimits } from './types';

const STORAGE_KEYS = {
  READINGS: 'tarot_readings',
  DAILY_LIMITS: 'tarot_daily_limits',
  LATEST_READING: 'tarot_latest_reading',
} as const;

const MAX_DAILY_DRAWS = 3;

export function saveReading(reading: Reading): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingReadings = getReadings();
    existingReadings.push(reading);
    
    // Keep only last 50 readings to prevent storage bloat
    const limitedReadings = existingReadings.slice(-50);
    
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(limitedReadings));
    localStorage.setItem(STORAGE_KEYS.LATEST_READING, reading.id);
  } catch (error) {
    console.error('Failed to save reading:', error);
  }
}

export function getReadings(): Reading[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.READINGS);
    if (!stored) return [];
    
    const readings = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return readings.map((reading: any) => ({
      ...reading,
      timestamp: new Date(reading.timestamp)
    }));
  } catch (error) {
    console.error('Failed to get readings:', error);
    return [];
  }
}

export function getLatestReading(): Reading | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const latestId = localStorage.getItem(STORAGE_KEYS.LATEST_READING);
    if (!latestId) return null;
    
    const readings = getReadings();
    return readings.find(reading => reading.id === latestId) || null;
  } catch (error) {
    console.error('Failed to get latest reading:', error);
    return null;
  }
}

export function updateReadingWithAI(readingId: string, aiInterpretation: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const readings = getReadings();
    const readingIndex = readings.findIndex(reading => reading.id === readingId);
    
    if (readingIndex === -1) return;
    
    readings[readingIndex].aiInterpretation = aiInterpretation;
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(readings));
  } catch (error) {
    console.error('Failed to update reading with AI interpretation:', error);
  }
}

export function getDailyLimits(): DailyLimits {
  if (typeof window === 'undefined') {
    return {
      date: new Date().toDateString(),
      drawCount: 0,
      maxDraws: MAX_DAILY_DRAWS
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_LIMITS);
    const today = new Date().toDateString();
    
    if (!stored) {
      const newLimits: DailyLimits = {
        date: today,
        drawCount: 0,
        maxDraws: MAX_DAILY_DRAWS
      };
      return newLimits;
    }
    
    const limits: DailyLimits = JSON.parse(stored);
    
    // Reset if it's a new day
    if (limits.date !== today) {
      const newLimits: DailyLimits = {
        date: today,
        drawCount: 0,
        maxDraws: MAX_DAILY_DRAWS
      };
      localStorage.setItem(STORAGE_KEYS.DAILY_LIMITS, JSON.stringify(newLimits));
      return newLimits;
    }
    
    return limits;
  } catch (error) {
    console.error('Failed to get daily limits:', error);
    return {
      date: new Date().toDateString(),
      drawCount: 0,
      maxDraws: MAX_DAILY_DRAWS
    };
  }
}

export function canDrawCards(): boolean {
  const limits = getDailyLimits();
  return limits.drawCount < limits.maxDraws;
}

export function incrementDrawCount(): DailyLimits {
  if (typeof window === 'undefined') {
    return {
      date: new Date().toDateString(),
      drawCount: 1,
      maxDraws: MAX_DAILY_DRAWS
    };
  }
  
  try {
    const limits = getDailyLimits();
    const newLimits: DailyLimits = {
      ...limits,
      drawCount: Math.min(limits.drawCount + 1, limits.maxDraws)
    };
    
    localStorage.setItem(STORAGE_KEYS.DAILY_LIMITS, JSON.stringify(newLimits));
    return newLimits;
  } catch (error) {
    console.error('Failed to increment draw count:', error);
    return getDailyLimits();
  }
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.READINGS);
    localStorage.removeItem(STORAGE_KEYS.DAILY_LIMITS);
    localStorage.removeItem(STORAGE_KEYS.LATEST_READING);
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}
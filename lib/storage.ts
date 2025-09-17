import { Reading, StoredReading } from './types';

const READINGS_KEY = 'tarot_readings';
const MAX_DAILY_READINGS = 3;

export function saveReading(reading: Reading): void {
  if (typeof window === 'undefined') return;

  const storedReading: StoredReading = {
    ...reading,
    timestamp: reading.timestamp.toISOString(),
  };

  const readings = getStoredReadings();
  readings.push(storedReading);

  localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
}

export function getStoredReadings(): StoredReading[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(READINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error parsing stored readings:', error);
    return [];
  }
}

export function getReadings(): Reading[] {
  return getStoredReadings().map((stored) => ({
    ...stored,
    timestamp: new Date(stored.timestamp),
  }));
}

export function getTodaysReadings(): Reading[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return getReadings().filter((reading) => {
    const readingDate = new Date(reading.timestamp);
    return readingDate >= today && readingDate < tomorrow;
  });
}

export function canDrawToday(): boolean {
  const todaysReadings = getTodaysReadings();
  return todaysReadings.length < MAX_DAILY_READINGS;
}

export function getRemainingReadingsToday(): number {
  const todaysReadings = getTodaysReadings();
  return Math.max(0, MAX_DAILY_READINGS - todaysReadings.length);
}

export function clearAllReadings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(READINGS_KEY);
}

export function getLatestReading(): Reading | null {
  const readings = getReadings();
  if (readings.length === 0) return null;

  return readings.reduce((latest, current) =>
    current.timestamp > latest.timestamp ? current : latest
  );
}

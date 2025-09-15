import { Reading, DailyStats } from './types'

const READINGS_KEY = 'tarot-readings'
const DAILY_STATS_KEY = 'tarot-daily-stats'
const THEME_KEY = 'tarot-theme'

export function saveReading(reading: Reading): void {
  try {
    const existingReadings = getReadings()
    const updatedReadings = [reading, ...existingReadings].slice(0, 50) // Keep only last 50 readings
    localStorage.setItem(READINGS_KEY, JSON.stringify(updatedReadings))
    
    // Update daily stats
    const today = new Date().toDateString()
    const dailyStats = getDailyStats()
    const todayStats = dailyStats.find(stat => stat.date === today)
    
    if (todayStats) {
      todayStats.count += 1
    } else {
      dailyStats.push({ date: today, count: 1 })
    }
    
    // Keep only last 30 days of stats
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toDateString()
    const filteredStats = dailyStats.filter(stat => stat.date >= thirtyDaysAgo)
    
    localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(filteredStats))
  } catch (error) {
    console.error('Failed to save reading:', error)
  }
}

export function getReadings(): Reading[] {
  try {
    const readingsJson = localStorage.getItem(READINGS_KEY)
    return readingsJson ? JSON.parse(readingsJson) : []
  } catch (error) {
    console.error('Failed to get readings:', error)
    return []
  }
}

export function getLatestReading(): Reading | null {
  const readings = getReadings()
  return readings.length > 0 ? readings[0] : null
}

export function getDailyStats(): DailyStats[] {
  try {
    const statsJson = localStorage.getItem(DAILY_STATS_KEY)
    return statsJson ? JSON.parse(statsJson) : []
  } catch (error) {
    console.error('Failed to get daily stats:', error)
    return []
  }
}

export function getTodayCount(): number {
  const today = new Date().toDateString()
  const dailyStats = getDailyStats()
  const todayStats = dailyStats.find(stat => stat.date === today)
  return todayStats ? todayStats.count : 0
}

export function canDrawToday(): boolean {
  return getTodayCount() < 3
}

export function clearTodayCount(): void {
  try {
    const today = new Date().toDateString()
    const dailyStats = getDailyStats()
    const filteredStats = dailyStats.filter(stat => stat.date !== today)
    localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(filteredStats))
  } catch (error) {
    console.error('Failed to clear today count:', error)
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch (error) {
    console.error('Failed to save theme:', error)
  }
}

export function getTheme(): 'light' | 'dark' | null {
  try {
    return localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null
  } catch (error) {
    console.error('Failed to get theme:', error)
    return null
  }
}
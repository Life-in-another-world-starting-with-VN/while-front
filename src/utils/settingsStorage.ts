import type { SettingsState } from '../types';

const SETTINGS_STORAGE_KEY = 'gameSettings';

/**
 * Load settings from localStorage
 */
export function loadSettings(): Partial<SettingsState> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as Partial<SettingsState>;
  } catch (error) {
    console.warn('Failed to load settings from storage:', error);
    return null;
  }
}

/**
 * Get character size from settings (default: 100%)
 */
export function getCharacterSize(): number {
  const settings = loadSettings();
  return settings?.characterSize ?? 100;
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: SettingsState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to storage:', error);
  }
}

/**
 * Subscribe to settings changes
 */
export function subscribeToSettings(callback: (settings: Partial<SettingsState>) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === SETTINGS_STORAGE_KEY && event.newValue) {
      try {
        const settings = JSON.parse(event.newValue) as Partial<SettingsState>;
        callback(settings);
      } catch (error) {
        console.warn('Failed to parse settings from storage event:', error);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}

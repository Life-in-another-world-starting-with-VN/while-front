import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LeftNavigation from '../../components/common/LeftNavigation';
import SettingsContent from './components/SettingsContent';
import { SettingsContainer } from './styled';
import type { NavigationItem, PageType } from '../../types/navigation';
import type { SettingsProps } from './type';
import type { SettingsState } from '../../types';

type AudioSettingKey = 'backgroundVolume' | 'soundEffectVolume' | 'voiceVolume';
type SliderKey = 'textSpeed' | 'autoProgressTime' | AudioSettingKey;

const SETTINGS_STORAGE_KEY = 'gameSettings';

const defaultSettings: SettingsState = {
  screenMode: 'windowed',
  skipUnreadText: false,
  skipAfterChoice: false,
  skipScreenTransition: false,
  textSpeed: 5,
  autoProgressTime: 5,
  backgroundVolume: 70,
  soundEffectVolume: 70,
  voiceVolume: 70,
  isMuted: false,
};

const AUDIO_SETTING_KEYS = new Set<AudioSettingKey>([
  'backgroundVolume',
  'soundEffectVolume',
  'voiceVolume',
]);

const isAudioSettingKey = (key: SliderKey): key is AudioSettingKey =>
  AUDIO_SETTING_KEYS.has(key as AudioSettingKey);

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.min(Math.max(numeric, min), max);
};

const normalizeSettings = (raw: Partial<SettingsState> | null | undefined): SettingsState => {
  if (!raw) {
    return defaultSettings;
  }

  const merged: SettingsState = {
    screenMode: raw.screenMode === 'fullscreen' ? 'fullscreen' : 'windowed',
    skipUnreadText: Boolean(raw.skipUnreadText),
    skipAfterChoice: Boolean(raw.skipAfterChoice),
    skipScreenTransition: Boolean(raw.skipScreenTransition),
    textSpeed: clampNumber(raw.textSpeed, 1, 10, defaultSettings.textSpeed),
    autoProgressTime: clampNumber(
      raw.autoProgressTime,
      1,
      10,
      defaultSettings.autoProgressTime,
    ),
    backgroundVolume: clampNumber(
      raw.backgroundVolume,
      0,
      100,
      defaultSettings.backgroundVolume,
    ),
    soundEffectVolume: clampNumber(
      raw.soundEffectVolume,
      0,
      100,
      defaultSettings.soundEffectVolume,
    ),
    voiceVolume: clampNumber(
      raw.voiceVolume,
      0,
      100,
      defaultSettings.voiceVolume,
    ),
    isMuted: Boolean(raw.isMuted),
  };

  if (
    merged.isMuted &&
    (merged.backgroundVolume > 0 ||
      merged.soundEffectVolume > 0 ||
      merged.voiceVolume > 0)
  ) {
    merged.isMuted = false;
  }

  return merged;
};

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window === 'undefined') {
      return defaultSettings;
    }

    try {
      const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!stored) {
        return defaultSettings;
      }

      const parsed = JSON.parse(stored) as Partial<SettingsState>;
      return normalizeSettings(parsed);
    } catch (error) {
      console.warn('Failed to load settings from storage:', error);
      return defaultSettings;
    }
  });

  const previousVolumesRef = useRef({
    backgroundVolume: settings.backgroundVolume,
    soundEffectVolume: settings.soundEffectVolume,
    voiceVolume: settings.voiceVolume,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const enterFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.warn('Failed to enter fullscreen mode:', error);
      }
    };

    const exitFullscreen = async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen?.();
        }
      } catch (error) {
        console.warn('Failed to exit fullscreen mode:', error);
      }
    };

    if (settings.screenMode === 'fullscreen') {
      if (!document.fullscreenElement) {
        void enterFullscreen();
      }
    } else if (document.fullscreenElement) {
      void exitFullscreen();
    }
  }, [settings.screenMode]);

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      { label: '대사록', pageType: 'dialogue' },
      { label: '저장하기', pageType: 'saveGame' },
      { label: '불러오기', pageType: 'loadGame' },
      { label: '환경설정', pageType: 'settings', isActive: true },
      { label: '메인 메뉴', pageType: 'mainMenu' },
      { label: '조작방법', pageType: 'controls' },
      { label: '종료하기', pageType: 'exit' },
    ],
    [],
  );

  const handleMenuClick = useCallback(
    (pageType: PageType) => {
      onNavigate?.(pageType);
    },
    [onNavigate],
  );

  const handleBackClick = useCallback(() => {
    onNavigate?.('mainMenu');
  }, [onNavigate]);

  const handleDisplayModeChange = useCallback((mode: SettingsState['screenMode']) => {
    setSettings(prev =>
      prev.screenMode === mode ? prev : { ...prev, screenMode: mode },
    );
  }, []);

  const handleSkipOptionToggle = useCallback(
    (option: 'skipUnreadText' | 'skipAfterChoice' | 'skipScreenTransition') => {
      setSettings(prev => ({ ...prev, [option]: !prev[option] }));
    },
    [],
  );

  const handleSliderChange = useCallback(
    (key: SliderKey, value: number) => {
      setSettings(prev => {
        if (isAudioSettingKey(key)) {
          const storedVolumes = previousVolumesRef.current;
          const nextVolumes = {
            backgroundVolume:
              key === 'backgroundVolume'
                ? value
                : prev.isMuted
                  ? storedVolumes.backgroundVolume
                  : prev.backgroundVolume,
            soundEffectVolume:
              key === 'soundEffectVolume'
                ? value
                : prev.isMuted
                  ? storedVolumes.soundEffectVolume
                  : prev.soundEffectVolume,
            voiceVolume:
              key === 'voiceVolume'
                ? value
                : prev.isMuted
                  ? storedVolumes.voiceVolume
                  : prev.voiceVolume,
          };

          if (prev.isMuted) {
            const shouldUnmute = Object.values(nextVolumes).some(
              volume => volume > 0,
            );

            if (shouldUnmute) {
              previousVolumesRef.current = { ...nextVolumes };
              return {
                ...prev,
                ...nextVolumes,
                isMuted: false,
              };
            }

            previousVolumesRef.current = { ...nextVolumes };
            return {
              ...prev,
              ...nextVolumes,
            };
          }

          const hasAnyVolume = Object.values(nextVolumes).some(
            volume => volume > 0,
          );
          previousVolumesRef.current = { ...nextVolumes };
          return {
            ...prev,
            ...nextVolumes,
            isMuted: hasAnyVolume ? false : true,
          };
        }

        return { ...prev, [key]: value };
      });
    },
    [],
  );

  const handleMuteToggle = useCallback(() => {
    setSettings(prev => {
      if (prev.isMuted) {
        const restored = previousVolumesRef.current;
        return {
          ...prev,
          ...restored,
          isMuted: false,
        };
      }

      previousVolumesRef.current = {
        backgroundVolume: prev.backgroundVolume,
        soundEffectVolume: prev.soundEffectVolume,
        voiceVolume: prev.voiceVolume,
      };

      return {
        ...prev,
        backgroundVolume: 0,
        soundEffectVolume: 0,
        voiceVolume: 0,
        isMuted: true,
      };
    });
  }, []);

  return (
    <SettingsContainer>
      <LeftNavigation
        navigationItems={navigationItems}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick}
      />
      <SettingsContent
        settings={settings}
        onDisplayModeChange={handleDisplayModeChange}
        onSkipOptionToggle={handleSkipOptionToggle}
        onSliderChange={handleSliderChange}
        onMuteToggle={handleMuteToggle}
      />
    </SettingsContainer>
  );
};

export default Settings;

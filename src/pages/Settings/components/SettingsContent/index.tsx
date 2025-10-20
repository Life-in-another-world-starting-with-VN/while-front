import React from 'react';
import SettingGroup from '../SettingGroup';
import Slider from '../../../../components/common/Slider';
import {
  RightSection,
  SettingsGrid,
  SliderSection,
  SliderColumn,
  MuteButton,
} from './styled';
import type { SettingsState } from '../../../../types';

interface SettingsContentProps {
  settings: SettingsState;
  onDisplayModeChange: (mode: SettingsState['screenMode']) => void;
  onSkipOptionToggle: (
    option: 'skipUnreadText' | 'skipAfterChoice' | 'skipScreenTransition'
  ) => void;
  onSliderChange: (
    key: 'textSpeed' | 'autoProgressTime' | 'backgroundVolume' | 'soundEffectVolume' | 'voiceVolume',
    value: number,
  ) => void;
  onMuteToggle: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  settings,
  onDisplayModeChange,
  onSkipOptionToggle,
  onSliderChange,
  onMuteToggle,
}) => {
  const displayModeOptions = [
    {
      label: '창 화면',
      isActive: settings.screenMode === 'windowed',
      onClick: () => onDisplayModeChange('windowed'),
    },
    {
      label: '전체 화면',
      isActive: settings.screenMode === 'fullscreen',
      onClick: () => onDisplayModeChange('fullscreen'),
    },
  ];

  const skipOptions = [
    {
      label: '읽지 않은 지문',
      isActive: settings.skipUnreadText,
      onClick: () => onSkipOptionToggle('skipUnreadText'),
    },
    {
      label: '선택지 이후',
      isActive: settings.skipAfterChoice,
      onClick: () => onSkipOptionToggle('skipAfterChoice'),
    },
    {
      label: '화면 전환 효과',
      isActive: settings.skipScreenTransition,
      onClick: () => onSkipOptionToggle('skipScreenTransition'),
    },
  ];

  return (
    <RightSection>
      <SettingsGrid>
        <SettingGroup
          title="화면 모드"
          options={displayModeOptions}
        />
        <SettingGroup
          title="넘기기"
          options={skipOptions}
        />
      </SettingsGrid>

      <SliderSection>
        <SliderColumn>
          <Slider
            label="텍스트 속도"
            value={settings.textSpeed}
            min={1}
            max={10}
            onChange={value => onSliderChange('textSpeed', value)}
          />
          <Slider
            label="자동 진행 시간"
            value={settings.autoProgressTime}
            min={1}
            max={10}
            onChange={value => onSliderChange('autoProgressTime', value)}
          />
        </SliderColumn>

        <SliderColumn>
          <Slider
            label="배경음 음량"
            value={settings.backgroundVolume}
            onChange={value => onSliderChange('backgroundVolume', value)}
          />
          <Slider
            label="효과음 음량"
            value={settings.soundEffectVolume}
            onChange={value => onSliderChange('soundEffectVolume', value)}
          />
          <Slider
            label="음성 음량"
            value={settings.voiceVolume}
            onChange={value => onSliderChange('voiceVolume', value)}
          />
        </SliderColumn>
      </SliderSection>

      <MuteButton onClick={onMuteToggle}>
        {settings.isMuted ? '음소거 해제' : '모두 음소거'}
      </MuteButton>
    </RightSection>
  );
};

export default SettingsContent;

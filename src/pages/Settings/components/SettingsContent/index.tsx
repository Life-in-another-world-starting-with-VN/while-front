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

interface SettingsContentProps {
  onMuteClick?: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ onMuteClick }) => {
  const displayModeOptions = [
    { label: '창 화면' },
    { label: '전체 화면' },
  ];

  const skipOptions = [
    { label: '읽지 않은 지문' },
    { label: '선택지 이후' },
    { label: '화면 전환 효과' },
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
          <Slider label="텍스트 속도" />
          <Slider label="자동 진행 시간" />
        </SliderColumn>

        <SliderColumn>
          <Slider label="배경음 음량" />
          <Slider label="효과음 음량" />
          <Slider label="음성 음량" />
        </SliderColumn>
      </SliderSection>

      <MuteButton onClick={onMuteClick}>모두 음소거</MuteButton>
    </RightSection>
  );
};

export default SettingsContent;
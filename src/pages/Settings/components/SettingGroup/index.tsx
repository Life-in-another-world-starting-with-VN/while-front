import React from 'react';
import { SettingGroup, SettingTitle, OptionList, Option } from './styled';

interface SettingOption {
  label: string;
  isActive?: boolean;
}

interface SettingGroupProps {
  title: string;
  options: SettingOption[];
  onOptionClick?: (optionIndex: number) => void;
}

const SettingGroupComponent: React.FC<SettingGroupProps> = ({
  title,
  options,
  onOptionClick,
}) => {
  return (
    <SettingGroup>
      <SettingTitle>{title}</SettingTitle>
      <OptionList>
        {options.map((option, index) => (
          <Option
            key={index}
            isActive={option.isActive}
            onClick={() => onOptionClick?.(index)}
          >
            {option.label}
          </Option>
        ))}
      </OptionList>
    </SettingGroup>
  );
};

export default SettingGroupComponent;
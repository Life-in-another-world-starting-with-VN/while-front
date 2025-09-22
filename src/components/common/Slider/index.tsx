import React from 'react';
import { SliderGroup, SliderLabel, SliderTrack, SliderThumb } from './styled';

interface SliderProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value = 70, onChange }) => {
  return (
    <SliderGroup>
      <SliderLabel>{label}</SliderLabel>
      <SliderTrack>
        <SliderThumb position={value} />
      </SliderTrack>
    </SliderGroup>
  );
};

export default Slider;
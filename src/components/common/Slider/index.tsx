import React, { useId, useMemo } from 'react';
import {
  SliderGroup,
  SliderLabel,
  SliderTrack,
  SliderThumb,
  SliderFill,
  SliderInput,
} from './styled';

interface SliderProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value = 70,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const sliderId = useId();

  const { clampedValue, percentage } = useMemo(() => {
    const range = Math.max(max - min, 1);
    const safeValue = Math.min(Math.max(value, min), max);
    const percent = ((safeValue - min) / range) * 100;
    return { clampedValue: safeValue, percentage: percent };
  }, [value, min, max]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    onChange?.(nextValue);
  };

  return (
    <SliderGroup>
      <SliderLabel htmlFor={sliderId}>{label}</SliderLabel>
      <SliderTrack>
        <SliderFill style={{ width: `${percentage}%` }} />
        <SliderThumb style={{ left: `${percentage}%` }} />
        <SliderInput
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={clampedValue}
          onChange={handleChange}
        />
      </SliderTrack>
    </SliderGroup>
  );
};

export default Slider;

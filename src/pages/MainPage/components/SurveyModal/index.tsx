import React, { useEffect, useMemo, useState } from 'react';
import {
  Overlay,
  ModalContainer,
  Title,
  Description,
  SurveyForm,
  Fieldset,
  Label,
  TextInput,
  Select,
  HelperText,
  ButtonRow,
  CancelButton,
  SubmitButton,
  ErrorText,
} from './styled';

export interface SurveyFormValues {
  personality: string;
  genre: string;
  playTime: string;
}

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: SurveyFormValues) => void;
  isSubmitting?: boolean;
  submissionError?: string | null;
}

const INITIAL_VALUES: SurveyFormValues = {
  personality: '',
  genre: '',
  playTime: '',
};

const personalityFilter = (value: string) =>
  value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]/g, '').replace(/\s{2,}/g, ' ');

const SurveyModal: React.FC<SurveyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  submissionError,
}) => {
  const [formValues, setFormValues] = useState<SurveyFormValues>(INITIAL_VALUES);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormValues(INITIAL_VALUES);
      setFormError(null);
    }
  }, [isOpen]);

  const genreOptions = useMemo(
    () => [
      { value: '', label: '장르를 선택해주세요' },
      { value: '코미디', label: '코미디' },
      { value: '로맨틱', label: '로맨틱' },
      { value: '청춘', label: '청춘' },
      { value: '판타지', label: '판타지' },
      { value: '자만추', label: '자만추' },
    ],
    [],
  );

  const playTimeOptions = useMemo(
    () => [
      { value: '', label: '예상 플레이 타임을 선택해주세요' },
      { value: 'under-30', label: '30분 이하' },
      { value: '30-60', label: '30분 ~ 1시간' },
      { value: '60-120', label: '1시간 ~ 2시간' },
      { value: 'over-120', label: '2시간 이상' },
    ],
    [],
  );

  const handleChange = (field: keyof SurveyFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;

    setFormValues(prev => ({
      ...prev,
      [field]: field === 'personality' ? personalityFilter(value) : value,
    }));

    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPersonality = formValues.personality.trim();

    if (!trimmedPersonality) {
      setFormError('성격을 입력해주세요.');
      return;
    }

    if (!formValues.genre) {
      setFormError('장르를 선택해주세요.');
      return;
    }

    if (!formValues.playTime) {
      setFormError('예상 플레이 타임을 선택해주세요.');
      return;
    }

    onSubmit({
      personality: trimmedPersonality,
      genre: formValues.genre,
      playTime: formValues.playTime,
    });
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <Title>게임 시작 전 간단한 조사를 해요</Title>
        <Description>맞춤형 경험을 위해 몇 가지 정보를 알려주세요.</Description>

        <SurveyForm onSubmit={handleSubmit}>
          <Fieldset>
            <Label htmlFor="personality">어떤 성격을 가진 캐릭터를 선호하나요?</Label>
            <TextInput
              id="personality"
              name="personality"
              value={formValues.personality}
              onChange={handleChange('personality')}
              placeholder="예: 차분하고 사려 깊은 스타일"
              maxLength={40}
            />
            <HelperText>특수문자는 자동으로 제거돼요.</HelperText>
          </Fieldset>

          <Fieldset>
            <Label htmlFor="genre">선호하는 장르</Label>
            <Select
              id="genre"
              name="genre"
              value={formValues.genre}
              onChange={handleChange('genre')}
            >
              {genreOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Fieldset>

          <Fieldset>
            <Label htmlFor="playTime">예상 플레이 타임</Label>
            <Select
              id="playTime"
              name="playTime"
              value={formValues.playTime}
              onChange={handleChange('playTime')}
            >
              {playTimeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Fieldset>

          {(formError || submissionError) && (
            <ErrorText>{formError ?? submissionError}</ErrorText>
          )}

          <ButtonRow>
            <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '전송 중...' : '게임 시작'}
            </SubmitButton>
          </ButtonRow>
        </SurveyForm>
      </ModalContainer>
    </Overlay>
  );
};

export default SurveyModal;

import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`;

export const ModalContainer = styled.div`
  width: 360px;
  padding: 30px 28px 24px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0c1c3f;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4a5368;
  line-height: 1.5;
`;

export const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1c2a3d;
`;

const baseInputStyles = `
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #d0d7e6;
  font-size: 14px;
  color: #1c2a3d;
  background: #f8faff;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #6aa8ff;
    box-shadow: 0 0 0 2px rgba(106, 168, 255, 0.2);
    outline: none;
  }

  &::placeholder {
    color: #949cb5;
  }
`;

export const TextInput = styled.input`
  ${baseInputStyles}
`;

export const Select = styled.select`
  ${baseInputStyles}
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #6aa8ff 50%),
    linear-gradient(135deg, #6aa8ff 50%, transparent 50%);
  background-position: calc(100% - 18px) calc(50% - 3px), calc(100% - 12px) calc(50% - 3px);
  background-size: 6px 6px;
  background-repeat: no-repeat;
`;

export const HelperText = styled.span`
  font-size: 12px;
  color: #6f7998;
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #d0342c;
`;

export const ButtonRow = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const BaseButton = styled.button`
  min-width: 96px;
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }
`;

export const CancelButton = styled(BaseButton)`
  background: #e8ecf4;
  color: #1c2a3d;

  &:hover:not(:disabled) {
    background: #d7deeb;
  }
`;

export const SubmitButton = styled(BaseButton)`
  background: linear-gradient(180deg, #ff8282 0%, #ff4d4d 100%);
  color: #ffffff;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #ff7070 0%, #ff2f2f 100%);
  }
`;

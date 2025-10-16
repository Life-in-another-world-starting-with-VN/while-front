import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 320px;
  padding: 28px 24px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 18px;
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

export const ButtonRow = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const BaseButton = styled.button`
  min-width: 80px;
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
`;

export const CancelButton = styled(BaseButton)`
  background: #e8ecf4;
  color: #1c2a3d;

  &:hover {
    background: #d7deeb;
  }
`;

export const ConfirmButton = styled(BaseButton)`
  background: linear-gradient(180deg, #ff8282 0%, #ff4d4d 100%);
  color: #ffffff;

  &:hover {
    background: linear-gradient(180deg, #ff7070 0%, #ff2f2f 100%);
  }
`;

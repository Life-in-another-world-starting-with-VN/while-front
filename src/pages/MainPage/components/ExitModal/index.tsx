import React from 'react';
import {
  Overlay,
  ModalContainer,
  Title,
  Description,
  ButtonRow,
  ConfirmButton,
  CancelButton,
} from './styled';

interface ExitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <Title>로그아웃하시겠습니까?</Title>
        <Description>확인을 누르면 로그아웃하고 로그인 화면으로 이동합니다.</Description>
        <ButtonRow>
          <CancelButton type="button" onClick={onCancel}>
            취소
          </CancelButton>
          <ConfirmButton type="button" onClick={onConfirm}>
            로그아웃
          </ConfirmButton>
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  );
};

export default ExitModal;

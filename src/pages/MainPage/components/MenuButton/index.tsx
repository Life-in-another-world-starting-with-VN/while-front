import styled from 'styled-components';

const MenuButton = styled.button`
  width: 100%;
  padding: 18px 24px;
  border: none;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.76);
  color: #10223d;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  text-decoration: none;
  box-shadow: 0 14px 32px rgba(16, 34, 61, 0.1);
  backdrop-filter: blur(16px);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.92);
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(16, 34, 61, 0.16);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 12px 24px rgba(16, 34, 61, 0.12);
  }
`;

export default MenuButton;

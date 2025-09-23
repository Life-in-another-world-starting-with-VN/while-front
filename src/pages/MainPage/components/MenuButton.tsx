import styled from 'styled-components';

const MenuButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(180deg, #B1DEF7 0%, #E4E8EB 100%);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px; 

  &:hover {
    background: #b0d8ff;
  }
`;

export default MenuButton;

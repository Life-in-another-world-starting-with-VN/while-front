import styled from 'styled-components';

const InputBox = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #f7a3c5;
  }
`;

export default InputBox;

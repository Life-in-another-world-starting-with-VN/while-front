import styled from 'styled-components';


export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100%;
`;

export const Character = styled.img`
  height: 100px;
  object-fit: contain;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex: 1 1 auto;
`;

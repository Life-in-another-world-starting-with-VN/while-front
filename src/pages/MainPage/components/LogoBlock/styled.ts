import styled from 'styled-components';

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 16%;
  text-align: center;
`;

export const LogoImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 32px;
  box-shadow: 0 16px 28px rgba(20, 40, 70, 0.18);
`;

export const LogoTitle = styled.h2`
  font-size: 1.75rem;
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  color: rgba(16, 34, 61, 0.85);
  margin: 0;
`;

export const LogoTagline = styled.p`
  font-size: 0.95rem;
  color: rgba(16, 34, 61, 0.65);
  margin: 0;
  line-height: 1.4;
`;

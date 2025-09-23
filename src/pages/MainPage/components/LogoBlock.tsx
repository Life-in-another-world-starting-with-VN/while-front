import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/Logo.png';

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const LogoImage = styled.img`
  width: 120px;
`;

const LogoBlock: React.FC = () => {
  return (
    <LogoContainer>
      <LogoImage src={logo} alt="logo" />
      <h2>LOVE CAMPUS</h2>
    </LogoContainer>
  );
};

export default LogoBlock;

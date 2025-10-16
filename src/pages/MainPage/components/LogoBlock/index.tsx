import React from 'react';
import logo from '../../../../assets/logo.png';
import { LogoContainer, LogoImage } from './styled';




const LogoBlock: React.FC = () => {
  return (
    <LogoContainer>
      <LogoImage src={logo} alt="logo" />
      <h2>LOVE CAMPUS</h2>
    </LogoContainer>
  );
};

export default LogoBlock;

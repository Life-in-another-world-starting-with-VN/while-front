import React from 'react';
import logo from '../../../../assets/while-logo.png';
import { LogoContainer, LogoImage } from './styled';




const LogoBlock: React.FC = () => {
  return (
    <LogoContainer>
      <LogoImage src={logo} alt="logo" />
    </LogoContainer>
  );
};

export default LogoBlock;

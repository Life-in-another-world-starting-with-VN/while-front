import React from 'react';
import logo from '../../../../assets/while-logo.png';
import { LogoContainer, LogoImage, LogoTagline, LogoTitle } from './styled';

const LogoBlock: React.FC = () => {
  return (
    <LogoContainer>
      <LogoImage src={logo} alt="logo" />
      <LogoTitle>WHILE</LogoTitle>
      <LogoTagline>몰입형 감정 인식 스토리 게임</LogoTagline>
    </LogoContainer>
  );
};

export default LogoBlock;

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles';

const SettingsContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.background};
  font-family: ${theme.typography.fontFamily};
  position: relative;
  display: flex;
  overflow: hidden;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 26rem;
  min-width: 20rem;
  padding: 2rem 0;
  position: relative;

  @media (max-width: 768px) {
    width: 18rem;
    min-width: 15rem;
    padding: 1rem 0;
  }
`;

const Title = styled.h1`
  font-size: 4.375rem;
  color: ${theme.colors.main};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 10.25rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 4rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding-left: 2rem;
  }
`;

const MenuItem = styled.li<{ isActive?: boolean }>`
  font-size: 2.5rem;
  color: ${props => props.isActive ? theme.colors.text : theme.colors.unselected};
  cursor: pointer;
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};
  text-align: ${props => props.isActive ? 'left' : 'left'};

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;

const Divider = styled.div`
  position: absolute;
  top: 8.75rem;
  right: 0;
  width: 0.1875rem;
  height: 51.25rem;
  background-color: ${theme.colors.sub2};

  @media (max-width: 768px) {
    top: 6rem;
    height: 35rem;
  }
`;

const BackButton = styled.button`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: ${theme.colors.grayText};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
    bottom: 2rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const SettingsGrid = styled.div`
  display: flex;
  gap: 9.375rem;
  margin-top: 3.75rem;

  @media (max-width: 1200px) {
    gap: 5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const SettingTitle = styled.h3`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Option = styled.div`
  font-size: 2.1875rem;
  color: ${theme.colors.unselected};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SliderSection = styled.div`
  display: flex;
  gap: 12.5rem;
  margin-top: 3rem;

  @media (max-width: 1200px) {
    gap: 6rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const SliderColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
  width: 21.875rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 2rem;
  }
`;

const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SliderLabel = styled.label`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 1.5625rem;
  background-color: ${theme.colors.sub1};
  border-radius: 1.25rem;
  overflow: hidden;
`;

const SliderThumb = styled.div`
  position: absolute;
  width: 0.625rem;
  height: 1.5833rem;
  background-color: ${theme.colors.sub3};
  border-radius: 1.25rem;
  left: 15.2917rem;
  top: 0;

  @media (max-width: 768px) {
    left: 70%;
  }
`;

const MuteButton = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 6rem;
  font-size: 2.5rem;
  color: ${theme.colors.unselected};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
    bottom: 2rem;
    right: 3rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;

const Settings: React.FC = () => {
  return (
    <SettingsContainer>
      <LeftSection>
        <Title>환경설정</Title>
        <MenuList>
          <MenuItem>대사록</MenuItem>
          <MenuItem>저장하기</MenuItem>
          <MenuItem>불러오기</MenuItem>
          <MenuItem isActive>환경설정</MenuItem>
          <MenuItem>메인 메뉴</MenuItem>
          <MenuItem>조작방법</MenuItem>
          <MenuItem>종료하기</MenuItem>
        </MenuList>
        <Divider />
        <BackButton>돌아가기</BackButton>
      </LeftSection>

      <RightSection>
        <SettingsGrid>
          <SettingGroup>
            <SettingTitle>화면 모드</SettingTitle>
            <OptionList>
              <Option>창 화면</Option>
              <Option>전체 화면</Option>
            </OptionList>
          </SettingGroup>

          <SettingGroup>
            <SettingTitle>넘기기</SettingTitle>
            <OptionList>
              <Option>읽지 않은 지문</Option>
              <Option>선택지 이후</Option>
              <Option>화면 전환 효과</Option>
            </OptionList>
          </SettingGroup>
        </SettingsGrid>

        <SliderSection>
          <SliderColumn>
            <SliderGroup>
              <SliderLabel>텍스트 속도</SliderLabel>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </SliderGroup>

            <SliderGroup>
              <SliderLabel>자동 진행 시간</SliderLabel>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </SliderGroup>
          </SliderColumn>

          <SliderColumn>
            <SliderGroup>
              <SliderLabel>배경음 음량</SliderLabel>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </SliderGroup>

            <SliderGroup>
              <SliderLabel>효과음 음량</SliderLabel>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </SliderGroup>

            <SliderGroup>
              <SliderLabel>음성 음량</SliderLabel>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </SliderGroup>
          </SliderColumn>
        </SliderSection>

        <MuteButton>모두 음소거</MuteButton>
      </RightSection>
    </SettingsContainer>
  );
};

export default Settings;
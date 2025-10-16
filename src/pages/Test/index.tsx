import styled from 'styled-components';
import { GlobalStyles, theme } from '../../styles';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.title};
  color: ${theme.colors.main};
  text-align: center;
`;

const Subtitle = styled.h2`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.option};
  color: ${theme.colors.text};
`;

const ColorPalette = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const ColorBox = styled.div<{ color: string; label: string }>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${theme.shadows.card};

  &::after {
    content: '${props => props.label}';
    position: absolute;
    bottom: -${theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
    font-size: ${theme.typography.sizes.label};
    color: ${theme.colors.grayText};
    white-space: nowrap;
  }
`;

const SliderTest = styled.div`
  width: 350px;
  height: ${theme.slider.height};
  background-color: ${theme.slider.trackColor};
  border-radius: ${theme.slider.borderRadius};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: ${theme.slider.thumbSize};
    height: 25px;
    background-color: ${theme.slider.thumbColor};
    border-radius: ${theme.slider.borderRadius};
    left: 244px;
    top: 0;
  }
`;

function Test() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Title>While - 테마 테스트</Title>

        <Subtitle>색상 팔레트</Subtitle>
        <ColorPalette>
          <ColorBox color={theme.colors.main} label="메인" />
          <ColorBox color={theme.colors.sub1} label="서브1" />
          <ColorBox color={theme.colors.sub2} label="서브2" />
          <ColorBox color={theme.colors.sub3} label="서브3" />
          <ColorBox color={theme.colors.text} label="텍스트" />
          <ColorBox color={theme.colors.grayText} label="회색텍스트" />
          <ColorBox color={theme.colors.unselected} label="선택안함" />
        </ColorPalette>

        <Subtitle>슬라이더 예시</Subtitle>
        <SliderTest />

        <div>
          <div style={{ fontSize: theme.typography.sizes.title, color: theme.colors.main }}>
            제목 텍스트 (70px)
          </div>
          <div style={{ fontSize: theme.typography.sizes.option, color: theme.colors.text }}>
            옵션 텍스트 (40px)
          </div>
          <div style={{ fontSize: theme.typography.sizes.subOption, color: theme.colors.unselected }}>
            하위 옵션 텍스트 (35px)
          </div>
          <div style={{ fontSize: theme.typography.sizes.button, color: theme.colors.grayText }}>
            버튼 텍스트 (25px)
          </div>
          <div style={{ fontSize: theme.typography.sizes.body, color: theme.colors.text }}>
            기본 텍스트 (20px)
          </div>
          <div style={{ fontSize: theme.typography.sizes.label, color: theme.colors.grayText }}>
            라벨 텍스트 (14px)
          </div>
        </div>
      </Container>
    </>
  );
}

export default Test;

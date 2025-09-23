import React from 'react';
import styled from 'styled-components';
import Card from './components/Card';
import QuestionBlock from './components/QuestionBlock';
import OptionButton from './components/OptionButton';
import InputBox from './components/InputBox';
import StartButton from './components/StartButton';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff6f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function QuestionPage() {
  return (
    <PageContainer>
      <Card>
        <QuestionBlock title="1. 활동 장소를 선택해주세요">
          <OptionButton>산</OptionButton>
          <OptionButton>바다</OptionButton>
          <OptionButton>도시아경</OptionButton>
        </QuestionBlock>

        <QuestionBlock title="2. 데이트 분위기를 선택해주세요">
          <OptionButton color="#ffe3ec">로맨틱</OptionButton>
          <OptionButton color="#d7f5d3">캐주얼</OptionButton>
          <OptionButton color="#ffeac8">모험적</OptionButton>
          <OptionButton color="#e6d7ff">문화적</OptionButton>
        </QuestionBlock>

        <QuestionBlock title="3. 데이트에서 꼭 해보고 싶은 것은 무엇인가요?">
          <InputBox placeholder="여기에 답변을 입력해주세요..." />
        </QuestionBlock>

        <StartButton>게임 시작</StartButton>
      </Card>
    </PageContainer>
  );
}

export default QuestionPage;

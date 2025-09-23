import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

interface Props {
  title: string;
  children?: React.ReactNode;
}

const QuestionBlock: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <OptionGroup>{children}</OptionGroup>
    </Container>
  );
};

export default QuestionBlock;

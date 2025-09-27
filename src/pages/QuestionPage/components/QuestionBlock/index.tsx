import React from 'react';
import { Container, Title, OptionGroup } from './styled';
import type { Props } from './type';


const QuestionBlock: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <OptionGroup>{children}</OptionGroup>
    </Container>
  );
};

export default QuestionBlock;

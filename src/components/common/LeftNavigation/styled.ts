import styled from 'styled-components';
import { theme } from '../../../styles';

export const LeftSection = styled.div`
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

export const Title = styled.h1`
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

export const MenuList = styled.ul`
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

export const MenuItem = styled.li<{ $isActive?: boolean }>`
  font-size: 2.5rem;
  color: ${({ $isActive }) => 
    $isActive ? theme.colors.text : theme.colors.unselected};
  cursor: pointer;
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;


export const Divider = styled.div`
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

export const BackButton = styled.button`
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
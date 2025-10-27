import styled from 'styled-components';

const Sidebar = styled.div`
  width: 280px;
  max-width: 320px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 28px 36px;
  gap: 32px;
  backdrop-filter: blur(18px);
  box-shadow: 12px 0 32px rgba(20, 40, 70, 0.12);
  border-right: 1px solid rgba(20, 40, 70, 0.08);
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 240px;
    padding: 40px 24px;
    gap: 28px;
  }

  @media (max-width: 768px) {
    width: 220px;
    padding: 32px 18px;
    gap: 24px;
  }
`;

export default Sidebar;

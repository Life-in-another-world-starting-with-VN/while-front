import styled from 'styled-components';
import { useEmotionDetection } from '../../hooks/useEmotionDetection';

const WidgetContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  z-index: 1200;
  pointer-events: none;
`;

const StatusCard = styled.div`
  min-width: 160px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
`;

const StatusLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #5d6f92;
  margin-bottom: 6px;
`;

const StatusValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #27344f;
`;

const Confidence = styled.div`
  font-size: 14px;
  color: #5d6f92;
  margin-top: 4px;
`;

const ErrorBanner = styled.div`
  padding: 10px 14px;
  background: rgba(255, 107, 129, 0.18);
  border-radius: 12px;
  color: #c44569;
  font-size: 12px;
  text-align: right;
  max-width: 220px;
  line-height: 1.4;
`;

const HiddenVideo = styled.video`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const EmotionStatusWidget = () => {
  const { videoRef, isLoading, expression, error } = useEmotionDetection();

  const statusText = isLoading
    ? '감정 분석 준비 중...'
    : expression
      ? expression.label
      : '얼굴을 화면에 맞춰주세요';

  return (
    <WidgetContainer>
      <HiddenVideo ref={videoRef} autoPlay muted playsInline />
      <StatusCard>
        <StatusLabel>현재 감정</StatusLabel>
        <StatusValue>{statusText}</StatusValue>
        {!isLoading && expression && <Confidence>{expression.confidence}%</Confidence>}
      </StatusCard>
      {error && <ErrorBanner>{error}</ErrorBanner>}
    </WidgetContainer>
  );
};

export default EmotionStatusWidget;

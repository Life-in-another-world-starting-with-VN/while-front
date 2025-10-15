import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GlobalStyles, theme } from "../../styles";
import { clearStoredRefreshToken, useTokenRefresh } from "../../hooks/useTokenRefresh";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.title};
  color: ${theme.colors.main};
`;

const Card = styled.section`
  background-color: ${theme.colors.sub3};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: ${theme.shadows.card};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.option};
  margin: 0;
`;

const TokenTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.sub1};
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.sizes.body};
  resize: vertical;
  background-color: ${theme.colors.background};
  color: inherit;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const Button = styled.button<{ $tone?: "primary" | "neutral" | "danger" }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.button};
  cursor: pointer;
  border: none;
  transition: transform 0.15s ease;

  ${({ $tone }) => {
    switch ($tone) {
      case "danger":
        return `
          background-color: ${theme.colors.sub2};
          color: ${theme.colors.background};
        `;
      case "neutral":
        return `
          background-color: ${theme.colors.unselected};
          color: ${theme.colors.text};
        `;
      default:
        return `
          background-color: ${theme.colors.main};
          color: ${theme.colors.background};
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

const StatusText = styled.p`
  font-size: ${theme.typography.sizes.body};
  margin: 0;
`;

const JsonOutput = styled.pre`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.sub1};
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.sizes.label};
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
`;

const REFRESH_STORAGE_KEY = "refresh_token";

function TokenRefreshTest() {
  const { refreshAccessToken, isRefreshing, refreshError } = useTokenRefresh();
  const [tokenInput, setTokenInput] = useState("");
  const [storedToken, setStoredToken] = useState("");
  const [lastResponse, setLastResponse] = useState<Awaited<ReturnType<typeof refreshAccessToken>> | null>(null);
  const [callError, setCallError] = useState<string | null>(null);

  useEffect(() => {
    const current = localStorage.getItem(REFRESH_STORAGE_KEY) ?? "";
    setTokenInput(current);
    setStoredToken(current);
  }, []);

  const handleSyncStoredToken = useCallback(() => {
    const current = localStorage.getItem(REFRESH_STORAGE_KEY) ?? "";
    setTokenInput(current);
    setStoredToken(current);
  }, []);

  const handleSave = useCallback(() => {
    const trimmed = tokenInput.trim();
    localStorage.setItem(REFRESH_STORAGE_KEY, trimmed);
    setStoredToken(trimmed);
  }, [tokenInput]);

  const handleClear = useCallback(() => {
    clearStoredRefreshToken();
    setStoredToken("");
    setTokenInput("");
    setLastResponse(null);
    setCallError(null);
  }, []);

  const handleRefresh = useCallback(async () => {
    setCallError(null);
    setLastResponse(null);
    try {
      const result = await refreshAccessToken();
      setLastResponse(result);
    } catch (error) {
      setCallError(error instanceof Error ? error.message : "토큰 갱신 중 알 수 없는 오류가 발생했습니다.");
    } finally {
      handleSyncStoredToken();
    }
  }, [refreshAccessToken, handleSyncStoredToken]);

  const formattedResponse = useMemo(() => {
    if (!lastResponse) {
      return "";
    }

    try {
      return JSON.stringify(lastResponse, null, 2);
    } catch {
      return String(lastResponse);
    }
  }, [lastResponse]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Title>토큰 리프레시 훅 테스트</Title>

        <Card>
          <SectionTitle>리프레시 토큰 관리</SectionTitle>
          <StatusText>
            현재 저장된 토큰: {storedToken ? `${storedToken.slice(0, 24)}...` : "저장된 토큰 없음"}
          </StatusText>
          <TokenTextArea
            value={tokenInput}
            placeholder="refresh_token 값을 여기에 입력하거나 붙여넣으세요."
            onChange={(event) => setTokenInput(event.target.value)}
          />
          <ButtonRow>
            <Button onClick={handleSave} disabled={!tokenInput.trim()}>
              로컬스토리지에 저장
            </Button>
            <Button $tone="neutral" onClick={handleSyncStoredToken}>
              로컬스토리지에서 불러오기
            </Button>
            <Button $tone="danger" onClick={handleClear}>
              토큰 비우기
            </Button>
          </ButtonRow>
        </Card>

        <Card>
          <SectionTitle>토큰 갱신 실행</SectionTitle>
          <StatusText>상태: {isRefreshing ? "갱신 중..." : "대기 중"}</StatusText>
          {refreshError && <StatusText>훅 에러: {refreshError}</StatusText>}
          {callError && <StatusText>요청 에러: {callError}</StatusText>}
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            토큰 갱신 요청 보내기
          </Button>
          <StatusText>응답</StatusText>
          <JsonOutput>{formattedResponse || "응답이 여기에 표시됩니다."}</JsonOutput>
        </Card>
      </Container>
    </>
  );
}

export default TokenRefreshTest;

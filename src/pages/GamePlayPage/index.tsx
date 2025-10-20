import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { theme } from '../../styles';
import { useAuth } from '../../store/AuthContext';
import {
  createSession,
  getMessages,
  sendMessage,
  type MessageResponse,
  type SessionResponse,
} from '../../services/sessionService';
import { getGame, type GameDetailResponse } from '../../services/gameService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: ${theme.typography.fontFamily};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #1a202c;
  font-weight: 700;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #5a67d8;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div<{ isUser: boolean }>`
  max-width: 75%;
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: 1rem;
  border-radius: ${props => (props.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px')};
  background: ${props => (props.isUser ? '#667eea' : 'rgba(255, 255, 255, 0.95)')};
  color: ${props => (props.isUser ? 'white' : '#1a202c')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  line-height: 1.5;
`;

const MessageTime = styled.div<{ isUser: boolean }>`
  font-size: 0.75rem;
  color: ${props => (props.isUser ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)')};
  margin-top: 0.25rem;
  text-align: ${props => (props.isUser ? 'right' : 'left')};
`;

const SystemMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 0.5rem auto;
`;

const InputContainer = styled.form`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #667eea;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  padding: 0.875rem 1.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5a67d8;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 1.25rem;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 18px 18px 18px 4px;
  max-width: 75px;
  align-self: flex-start;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const GamePlayPage: React.FC = () => {
  const { accessToken, refreshAccessToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameIdParam = searchParams.get('gameId');

  const [game, setGame] = useState<GameDetailResponse | null>(null);
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get or refresh access token
  const getToken = useCallback(async (): Promise<string> => {
    if (accessToken) return accessToken;
    const refreshed = await refreshAccessToken();
    return refreshed.accessToken;
  }, [accessToken, refreshAccessToken]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize game and session
  useEffect(() => {
    const initialize = async () => {
      if (!gameIdParam) {
        setError('게임 ID가 필요합니다.');
        return;
      }

      setIsLoading(true);
      try {
        const token = await getToken();

        // Load game details
        console.log('[GamePlayPage] Loading game:', gameIdParam);
        const gameData = await getGame(gameIdParam, token);
        console.log('[GamePlayPage] Game loaded:', gameData);
        setGame(gameData);

        // Create session
        console.log('[GamePlayPage] Creating session...');
        const sessionData = await createSession(gameIdParam, '플레이어', token);
        console.log('[GamePlayPage] Session created:', sessionData);
        setSession(sessionData);

        // Load initial messages
        await loadMessages(sessionData.id, token);
      } catch (err) {
        console.error('[GamePlayPage] Initialization error:', err);
        setError(err instanceof Error ? err.message : '게임을 시작할 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [gameIdParam, getToken]);

  // Poll for new messages
  useEffect(() => {
    if (!session) return;

    const pollMessages = async () => {
      try {
        const token = await getToken();
        await loadMessages(session.id, token);
      } catch (err) {
        console.error('[GamePlayPage] Polling error:', err);
      }
    };

    // Poll every 2 seconds
    pollingIntervalRef.current = setInterval(pollMessages, 2000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [session, getToken]);

  const loadMessages = async (sessionId: string, token: string) => {
    const msgs = await getMessages(sessionId, token);
    console.log('[GamePlayPage] Messages loaded:', msgs.length);
    setMessages(msgs);

    // Check if last message is from system (AI is typing)
    if (msgs.length > 0) {
      const lastMsg = msgs[msgs.length - 1];
      setIsTyping(!lastMsg.user_id && lastMsg.is_system === false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !session || isLoading) return;

    const messageContent = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const token = await getToken();
      console.log('[GamePlayPage] Sending message:', messageContent);

      const newMessage = await sendMessage(session.id, messageContent, token);
      console.log('[GamePlayPage] Message sent:', newMessage);

      setMessages(prev => [...prev, newMessage]);

      // Wait a bit for AI response
      setTimeout(async () => {
        await loadMessages(session.id, token);
        setIsTyping(false);
      }, 1500);
    } catch (err) {
      console.error('[GamePlayPage] Send message error:', err);
      setError(err instanceof Error ? err.message : '메시지 전송 실패');
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading && !game) {
    return (
      <LoadingScreen>
        <Spinner />
        <div>게임을 시작하는 중...</div>
      </LoadingScreen>
    );
  }

  if (error && !game) {
    return (
      <LoadingScreen>
        <div>❌ {error}</div>
        <BackButton onClick={handleBack}>돌아가기</BackButton>
      </LoadingScreen>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{game?.title || '게임 플레이'}</Title>
        <BackButton onClick={handleBack}>나가기</BackButton>
      </Header>

      <MessagesContainer>
        {messages.map(message => {
          const isUser = message.user_id !== null;
          const isSystemMsg = message.is_system;

          if (isSystemMsg) {
            return <SystemMessage key={message.id}>{message.content}</SystemMessage>;
          }

          return (
            <Message key={message.id} isUser={isUser}>
              <MessageBubble isUser={isUser}>{message.content}</MessageBubble>
              <MessageTime isUser={isUser}>{formatTime(message.created_at)}</MessageTime>
            </Message>
          );
        })}

        {isTyping && (
          <Message isUser={false}>
            <TypingIndicator>
              <Dot delay={0} />
              <Dot delay={0.2} />
              <Dot delay={0.4} />
            </TypingIndicator>
          </Message>
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading}
        />
        <SendButton type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? '전송 중...' : '전송'}
        </SendButton>
      </InputContainer>

      {error && (
        <SystemMessage style={{ margin: '0.5rem' }}>❌ {error}</SystemMessage>
      )}
    </Container>
  );
};

export default GamePlayPage;

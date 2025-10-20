// Session-based Game API Service
import { apiRequest } from './api';

export interface SessionResponse {
  id: string;
  game_id: string;
  host_id: string;
  current_scene_id: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SessionDetailResponse extends SessionResponse {
  game: {
    id: string;
    title: string;
    description: string | null;
    personality: string;
    genre: string;
    playtime: number;
  };
}

export interface MessageResponse {
  id: string;
  session_id: string;
  user_id: string | null;
  content: string;
  is_system: boolean;
  created_at: string;
}

export interface MessageCreateRequest {
  content: string;
}

/**
 * Create a new game session
 */
export async function createSession(
  gameId: string,
  playerName: string,
  token: string
): Promise<SessionResponse> {
  return apiRequest<SessionResponse>(`/api/v1/games/${gameId}/sessions`, {
    method: 'POST',
    body: { player_name: playerName },
    token,
  });
}

/**
 * Get session details
 */
export async function getSession(
  sessionId: string,
  token: string
): Promise<SessionDetailResponse> {
  return apiRequest<SessionDetailResponse>(`/api/v1/sessions/${sessionId}`, {
    method: 'GET',
    token,
  });
}

/**
 * Get messages for a session
 */
export async function getMessages(
  sessionId: string,
  token: string
): Promise<MessageResponse[]> {
  return apiRequest<MessageResponse[]>(`/api/v1/sessions/${sessionId}/messages`, {
    method: 'GET',
    token,
  });
}

/**
 * Send a message in a session
 */
export async function sendMessage(
  sessionId: string,
  content: string,
  token: string
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/api/v1/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: { content },
    token,
  });
}

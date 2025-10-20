// Game Management Service
import { apiRequest } from './api';

export interface GameCreateRequest {
  personality: string; // 캐릭터 성격 (예: 츤데레, 순수, 활발함)
  genre: string; // 장르 (예: 로맨스, 판타지, 학원물)
  playtime: number; // 예상 플레이 타임 (분 단위)
}

export interface GameResponse {
  id: string;
  title: string;
  description: string | null;
  personality: string;
  genre: string;
  playtime: number;
  creator_id: string;
  is_published: boolean | null;
}

export interface SceneSummary {
  id: string;
  scene_key: string;
  title: string;
}

export interface CharacterSummary {
  id: string;
  name: string;
  description: string | null;
}

export interface GameDetailResponse extends GameResponse {
  scenes: SceneSummary[];
  characters: CharacterSummary[];
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Get list of all games (requires authentication)
 */
export async function getGames(token: string): Promise<GameResponse[]> {
  return apiRequest<GameResponse[]>('/api/v1/games', {
    method: 'GET',
    token,
  });
}

/**
 * Create a new game (requires authentication)
 */
export async function createGame(
  data: GameCreateRequest,
  token: string
): Promise<GameResponse> {
  return apiRequest<GameResponse>('/api/v1/games', {
    method: 'POST',
    body: data,
    token,
  });
}

/**
 * Get game details by ID (requires authentication)
 */
export async function getGame(
  gameId: string,
  token: string
): Promise<GameDetailResponse> {
  return apiRequest<GameDetailResponse>(`/api/v1/games/${gameId}`, {
    method: 'GET',
    token,
  });
}

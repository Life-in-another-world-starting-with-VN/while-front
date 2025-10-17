// Story Engine Service for Gameplay
import { apiRequest } from './api';

export interface StoryState {
  scene_id: string;
  scene_title: string;
  dialogues: Array<{
    id: string;
    text_template: string;
    character_id: string | null;
    scene_id: string;
  }>;
  available_choices: Array<{
    id: string;
    text: string;
    dialogue_id: string;
    next_scene_id: string | null;
  }>;
  state_data: Record<string, unknown>;
}

export interface ProgressResponse {
  id: string;
  user_id: string;
  game_id: string;
  current_scene_id: string | null;
  choices_made: Array<Record<string, unknown>>;
  state_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Start a new game session
 */
export async function startGame(
  gameId: string,
  token: string
): Promise<ProgressResponse> {
  return apiRequest<ProgressResponse>(`/api/v1/story/start/${gameId}`, {
    method: 'POST',
    token,
  });
}

/**
 * Get current story state
 */
export async function getStoryState(
  gameId: string,
  token: string
): Promise<StoryState> {
  return apiRequest<StoryState>(`/api/v1/story/state/${gameId}`, {
    method: 'GET',
    token,
  });
}

/**
 * Make a choice in the game
 */
export async function makeChoice(
  gameId: string,
  dialogueId: string,
  choiceId: string,
  token: string
): Promise<StoryState> {
  return apiRequest<StoryState>(
    `/api/v1/story/choice/${gameId}?dialogue_id=${dialogueId}&choice_id=${choiceId}`,
    {
      method: 'POST',
      token,
    }
  );
}

/**
 * Get game progress
 */
export async function getProgress(
  gameId: string,
  token: string
): Promise<ProgressResponse> {
  return apiRequest<ProgressResponse>(`/api/v1/story/progress/${gameId}`, {
    method: 'GET',
    token,
  });
}

/**
 * Update story state (for manual state management)
 */
export async function updateState(
  gameId: string,
  updates: Record<string, unknown>,
  token: string
): Promise<ProgressResponse> {
  return apiRequest<ProgressResponse>(`/api/v1/story/state/${gameId}`, {
    method: 'PATCH',
    body: updates,
    token,
  });
}

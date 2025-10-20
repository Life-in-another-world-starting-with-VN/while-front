import { buildApiUrl } from '../config/env';

export interface GameSurveyPayload {
  personality: string;
  genre: string;
  playTime: string;
}

const GAME_SURVEY_ENDPOINT = buildApiUrl('/api/v1/surveys/game-start');

/**
 * Temporary placeholder for the upcoming backend integration.
 * Keeps the publishing contract in place until the API is ready.
 */
export const publishGameSurvey = async (payload: GameSurveyPayload) => {
  console.info('[publishGameSurvey] Pending backend integration', {
    endpoint: GAME_SURVEY_ENDPOINT,
    payload,
  });

  return Promise.resolve({ ok: true });
};

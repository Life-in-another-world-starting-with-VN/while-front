import { buildApiUrl } from '../config/env';

export interface CreateGameRequest {
  personality: string;
  genre: string;
  playtime: number;
}

export interface CreateGameResponse {
  id: string;
  title: string;
  description: string;
  personality: string;
  genre: string;
  playtime: number;
  creator_id: string;
  is_published: boolean;
}

interface PublishGameSurveyOptions {
  accessToken: string;
}

const GAME_SURVEY_ENDPOINT = buildApiUrl('/api/v1/games');

const isCreateGameResponse = (payload: unknown): payload is CreateGameResponse => {
  if (!payload || typeof payload !== 'object') return false;
  const data = payload as Record<string, unknown>;

  const requireString = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

  return (
    requireString(data.id) &&
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    requireString(data.personality) &&
    requireString(data.genre) &&
    typeof data.playtime === 'number' &&
    Number.isFinite(data.playtime) &&
    typeof data.creator_id === 'string' &&
    typeof data.is_published === 'boolean'
  );
};

const parseErrorMessage = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') return null;
  const detail = (payload as { detail?: unknown }).detail;

  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const message = (item as { msg?: unknown }).msg;
        return typeof message === 'string' ? message : null;
      })
      .filter((msg): msg is string => Boolean(msg))
      .join('\n');
  }

  return null;
};

export const publishGameSurvey = async (
  payload: CreateGameRequest,
  { accessToken }: PublishGameSurveyOptions,
): Promise<CreateGameResponse> => {
  if (!accessToken) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await fetch(GAME_SURVEY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  let parsedBody: unknown = null;

  if (responseText) {
    try {
      parsedBody = JSON.parse(responseText);
    } catch {
      throw new Error('게임 생성 응답을 파싱하지 못했습니다.');
    }
  }

  if (!response.ok) {
    const message = parseErrorMessage(parsedBody) ?? '게임 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    throw new Error(message);
  }

  if (!isCreateGameResponse(parsedBody)) {
    throw new Error('게임 생성 응답 형식이 올바르지 않습니다.');
  }

  return parsedBody;
};

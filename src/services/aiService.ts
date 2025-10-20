// AI Content Generation Service
import { apiRequest } from './api';

export interface AIGenerateRequest {
  prompt: string;
}

export interface AIJobResponse {
  job_id: string;
  status: string;
  prompt: string;
  result?: Record<string, unknown> | null;
  error_message?: string | null;
}

/**
 * Generate game content using AI
 */
export async function generateContent(
  prompt: string,
  token: string
): Promise<AIJobResponse> {
  return apiRequest<AIJobResponse>('/api/v1/ai/ai/generate', {
    method: 'POST',
    body: { prompt },
    token,
  });
}

/**
 * Check AI job status
 */
export async function getJobStatus(
  jobId: string,
  token: string
): Promise<AIJobResponse> {
  return apiRequest<AIJobResponse>(`/api/v1/ai/ai/jobs/${jobId}`, {
    method: 'GET',
    token,
  });
}

/**
 * Poll job status until completion
 */
export async function waitForJobCompletion(
  jobId: string,
  token: string,
  maxAttempts: number = 60,
  intervalMs: number = 2000
): Promise<AIJobResponse> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const job = await getJobStatus(jobId, token);

    if (job.status === 'completed') {
      return job;
    }

    if (job.status === 'failed') {
      throw new Error(job.error_message || 'AI 생성 작업이 실패했습니다.');
    }

    // Wait before next attempt
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  throw new Error('AI 생성 작업 시간이 초과되었습니다.');
}

/**
 * Generate game content and wait for completion
 */
export async function generateAndWaitForContent(
  gameId: string,
  personality: string,
  genre: string,
  playtime: number,
  token: string
): Promise<AIJobResponse> {
  const prompt = `게임 ID: ${gameId}
성격: ${personality}
장르: ${genre}
플레이타임: ${playtime}분

위 설정으로 미연시 게임의 캐릭터, 씬, 대사를 생성해주세요.`;

  const job = await generateContent(prompt, token);
  return waitForJobCompletion(job.job_id, token);
}

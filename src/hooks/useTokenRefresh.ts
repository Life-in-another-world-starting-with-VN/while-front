import { useCallback, useState } from "react";

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user?: Record<string, unknown>;
};

type RefreshState = {
  isRefreshing: boolean;
  error: string | null;
};

const REFRESH_ENDPOINT = "https://api.mieung.kr/api/v1/auth/refresh";
const REFRESH_STORAGE_KEY = "refresh_token";

export function useTokenRefresh() {
  const [state, setState] = useState<RefreshState>({ isRefreshing: false, error: null });

  const refreshAccessToken = useCallback(async (): Promise<RefreshResponse> => {
    const storedRefreshToken = localStorage.getItem(REFRESH_STORAGE_KEY);

    if (!storedRefreshToken) {
      const message = "리프레시 토큰이 없습니다. 다시 로그인해 주세요.";
      setState({ isRefreshing: false, error: message });
      throw new Error(message);
    }

    setState({ isRefreshing: true, error: null });

    try {
      const response = await fetch(REFRESH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: storedRefreshToken }),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok || !payload) {
        const message = (() => {
          if (payload && typeof payload === "object") {
            const detail = (payload as { detail?: unknown }).detail;
            if (Array.isArray(detail) && detail.length > 0) {
              return detail
                .map((item) => String((item as { msg?: unknown }).msg ?? "토큰 갱신 중 문제가 발생했습니다."))
                .join("\n");
            }
            if (typeof detail === "string") {
              return detail;
            }
          }
          return "토큰을 갱신할 수 없습니다. 다시 로그인해 주세요.";
        })();

        setState({ isRefreshing: false, error: message });
        throw new Error(message);
      }

      const refreshed = payload as RefreshResponse;

      if (typeof refreshed.refresh_token === "string" && refreshed.refresh_token.length > 0) {
        localStorage.setItem(REFRESH_STORAGE_KEY, refreshed.refresh_token);
      }

      setState({ isRefreshing: false, error: null });
      return refreshed;
    } catch (error) {
      const message = error instanceof Error ? error.message : "토큰 갱신에 실패했습니다.";
      setState({ isRefreshing: false, error: message });
      throw new Error(message);
    }
  }, []);

  return {
    refreshAccessToken,
    isRefreshing: state.isRefreshing,
    refreshError: state.error,
  };
}

export function clearStoredRefreshToken() {
  localStorage.removeItem(REFRESH_STORAGE_KEY);
}

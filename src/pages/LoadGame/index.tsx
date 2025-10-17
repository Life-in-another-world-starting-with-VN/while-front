import React, { useEffect, useState, useCallback } from 'react';
import LeftNavigation from '../../components/common/LeftNavigation';
import LoadGameContent from './components/LoadGameContent';
import { LoadGameContainer } from './styled';
import type { NavigationItem, PageType } from '../../types/navigation';
import axios from 'axios';

const API_BASE_URL = 'https://api.mieung.kr';
const REFRESH_ENDPOINT = `${API_BASE_URL}/api/v1/auth/refresh`;
const REFRESH_STORAGE_KEY = "refresh_token";

//허동운 죽어라
export function useTokenRefresh() {
  const refreshAccessToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_STORAGE_KEY);
    console.log("Stored Refresh Token: ", storedRefreshToken);
    if (!storedRefreshToken) throw new Error("리프레시 토큰이 없습니다. 다시 로그인해 주세요.");

    const response = await fetch(REFRESH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: storedRefreshToken }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.access_token) {
      throw new Error("액세스 토큰 갱신 실패");
    }

    if (payload.refresh_token) {
      localStorage.setItem(REFRESH_STORAGE_KEY, payload.refresh_token);
      console.log("Refresh token updated.");
    }

    return {
      accessToken: payload.access_token as string,
      userId: payload.user?.id as string,
    };
  }, []);

  return { refreshAccessToken };
}

// 타입입이이ㅣ잉입입이이이
export interface SaveData {
  id: string;
  user_id: string;
  game_id: string;
  save_name: string;
  save_data: Record<string, any>;
  created_at: string;
}

export interface SaveSlotData {
  slotNumber: number;
  title?: string;
  timestamp?: string;
  isEmpty?: boolean;
  saveId?: string;
}

interface LoadGameProps {
  onNavigate?: (pageType: PageType) => void;
}

const LoadGame: React.FC<LoadGameProps> = ({ onNavigate }) => {
  const [saveSlots, setSaveSlots] = useState<SaveSlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { refreshAccessToken } = useTokenRefresh();

  const navigationItems: NavigationItem[] = [
    { label: '대사록', pageType: 'dialogue' },
    { label: '저장하기', pageType: 'saveGame' },
    { label: '불러오기', pageType: 'loadGame', isActive: true },
    { label: '환경설정', pageType: 'settings' },
    { label: '메인 메뉴', pageType: 'mainMenu' },
    { label: '조작방법', pageType: 'controls' },
    { label: '종료하기', pageType: 'exit' },
  ];

  const handleMenuClick = (pageType: PageType) => onNavigate?.(pageType);
  const handleBackClick = () => console.log('Back button clicked');
  const handleSlotClick = (slotNumber: number, saveId?: string) => {
    if (saveId) console.log(`Loading save ID: ${saveId} from slot ${slotNumber}`);
    else console.log(`Empty slot ${slotNumber} clicked`);
  };

  useEffect(() => {
    const fetchSaves = async () => {
      setLoading(true);
      try {
        const { accessToken, userId } = await refreshAccessToken();
        if (!userId) throw new Error("유저 ID를 가져올 수 없습니다.");

        const response = await axios.get<SaveData[]>(`${API_BASE_URL}/api/v1/saves/saves`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'user-id': userId,
            Accept: 'application/json',
          },
        });

        const data = response.data;

        const formattedSlots: SaveSlotData[] = data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6)
          .map((save, index) => ({
            slotNumber: index + 1,
            title: save.save_name || save.game_id || `세이브 ${index + 1}`,
            timestamp: new Date(save.created_at).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            isEmpty: false,
            saveId: save.id,
          }));

        const emptySlots: SaveSlotData[] = Array.from(
          { length: 6 - formattedSlots.length },
          (_, i) => ({
            slotNumber: formattedSlots.length + i + 1,
            isEmpty: true,
          })
        );

        setSaveSlots([...formattedSlots, ...emptySlots]);
        setError(null);
      } catch (err: any) {
        console.error("세이브 불러오기 오류:", err);
        setError(err.message || '세이브 데이터를 불러오지 못했습니다.');
        setSaveSlots(Array.from({ length: 6 }, (_, i) => ({ slotNumber: i + 1, isEmpty: true })));
      } finally {
        setLoading(false);
      }
    };

    fetchSaves();
  }, [refreshAccessToken]);

  if (loading) return <LoadGameContainer>로딩 중...</LoadGameContainer>;
  if (error) return <LoadGameContainer>{error}</LoadGameContainer>;

  return (
    <LoadGameContainer>
      <LeftNavigation
        navigationItems={navigationItems}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick}
      />
      <LoadGameContent saveSlots={saveSlots} onSlotClick={handleSlotClick} />
    </LoadGameContainer>
  );
};

export default LoadGame;

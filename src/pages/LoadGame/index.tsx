import React, { useEffect, useState } from 'react';
import LeftNavigation from '../../components/common/LeftNavigation';
import LoadGameContent from './components/LoadGameContent';
import { LoadGameContainer } from './styled';
import type { NavigationItem, PageType } from '../../types/navigation';
import axios from 'axios';
// import useTokenRefresh  // useTokenRefresh임포트 필요

interface LoadGameProps {
  onNavigate?: (pageType: PageType) => void;
  userId: string;
}

export interface SaveData {
  id: string;
  user_id: string;
  game_id: string;
  session_snapshot: Record<string, any>;
  created_at: string;
}

export interface SaveSlotData {
  slotNumber: number;
  title?: string;
  timestamp?: string;
  isEmpty?: boolean;
  saveId?: string; 
}

const API_BASE_URL = 'http://35.216.19.71:8000';

const LoadGame: React.FC<LoadGameProps> = ({ onNavigate, userId }) => {
  const [saveSlots, setSaveSlots] = useState<SaveSlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const { accessToken, refreshTokenIfNeeded } = useTokenRefresh(); 

  const navigationItems: NavigationItem[] = [
    { label: '대사록', pageType: 'dialogue' },
    { label: '저장하기', pageType: 'saveGame' },
    { label: '불러오기', pageType: 'loadGame', isActive: true },
    { label: '환경설정', pageType: 'settings' },
    { label: '메인 메뉴', pageType: 'mainMenu' },
    { label: '조작방법', pageType: 'controls' },
    { label: '종료하기', pageType: 'exit' },
  ];

  const handleMenuClick = (pageType: PageType) => {
    onNavigate?.(pageType);
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handleSlotClick = (slotNumber: number, saveId?: string) => {
    if (saveId) {
      console.log(`Loading save ID: ${saveId} from slot ${slotNumber}`);
    } else {
      console.log(`Empty slot ${slotNumber} clicked`);
    }
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(async (config) => {
      await refreshTokenIfNeeded(); 
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    }, (err) => Promise.reject(err));
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          await refreshTokenIfNeeded();
          if (accessToken) {
            err.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(err.config);
          }
        }
        return Promise.reject(err);
      }
    );

    const fetchSaves = async () => {
      try {
        const response = await axios.get<SaveData[]>(`${API_BASE_URL}/api/v1/saves/users/${userId}/saves`);
        const data = response.data;

        const formattedSlots: SaveSlotData[] = data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6)
          .map((save, index) => ({
            slotNumber: index + 1,
            title: save.session_snapshot.title || save.game_id || `세이브 ${index + 1}`,
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

        const emptySlotsCount = 6 - formattedSlots.length;
        const emptySlots: SaveSlotData[] = Array.from({ length: emptySlotsCount }, (_, index) => ({
          slotNumber: formattedSlots.length + index + 1,
          isEmpty: true,
        }));

        setSaveSlots([...formattedSlots, ...emptySlots]);
        setLoading(false);
      } catch (err: any) {
        setError('세이브 데이터를 불러오지 못했습니다. 오류: ' + (err.response?.data?.detail || err.message || 'Unknown'));
        setLoading(false);
        console.error(err);

        const defaultSlots: SaveSlotData[] = Array.from({ length: 6 }, (_, index) => ({
          slotNumber: index + 1,
          isEmpty: true,
        }));
        setSaveSlots(defaultSlots);
      }
    };

    if (userId && accessToken) {
      fetchSaves();
    } else {
      setError('User ID 또는 Access Token이 제공되지 않았습니다.');
      setLoading(false);
      const defaultSlots: SaveSlotData[] = Array.from({ length: 6 }, (_, index) => ({
        slotNumber: index + 1,
        isEmpty: true,
      }));
      setSaveSlots(defaultSlots);
    }

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [userId, accessToken, refreshTokenIfNeeded]);

  if (loading) {
    return (
      <LoadGameContainer>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          로딩 중...
        </div>
      </LoadGameContainer>
    );
  }

  if (error) {
    return (
      <LoadGameContainer>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
          {error}
        </div>
      </LoadGameContainer>
    );
  }

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
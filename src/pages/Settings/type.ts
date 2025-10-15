import type { PageType } from '../../types/navigation';

export interface SettingsProps {
  onNavigate?: (pageType: PageType) => void;
}
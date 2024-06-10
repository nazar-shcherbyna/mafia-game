import {
  PlayerGameDictType,
  RoundReportInterface,
} from '@/app/dashboard/game/types';
import { useGameStore } from '@/app/store';

export const useCalculateGameActionsHook = () => {
  const [roundReport, setRoundReport] = useGameStore((state) => [
    state.roundReport,
    state.setRoundReport,
  ]);
  const registeredPlayers = useGameStore((state) => state.registeredPlayers);

  const getNewStatuses = (previousPlayers: PlayerGameDictType) => {
    const report: RoundReportInterface[] = [];

    return report;
  };

  return { getNewStatuses };
};

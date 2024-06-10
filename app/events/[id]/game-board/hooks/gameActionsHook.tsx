import { GAME_PLAYER_STATUS } from '@/app/dashboard/game/constans';
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

    const newStatuses = Object.entries(previousPlayers).reduce(
      (acc, [id, player]) => {
        const status =
          GAME_PLAYER_STATUS[player.status].maxTime < 999
            ? 'ALIVE'
            : player.status;

        const newStatuses = player.actions.sort(
          (action1, action2) =>
            GAME_PLAYER_STATUS[action2].order -
            GAME_PLAYER_STATUS[action1].order,
        );

        const newStatus = newStatuses[0] || status;
        if (player.status !== newStatus) {
          report.push({
            nickname:
              registeredPlayers.find((player) => player.id === id)?.nickname ||
              '',
            actions: newStatuses,
            sitPlace: player.sitPlace,
            status: newStatus,
            role: player.role,
          });
        }

        acc[id] = {
          ...player,
          status: newStatus,
          actions: [],
        };
        return acc;
      },
      {} as PlayerGameDictType,
    );

    setRoundReport([...roundReport, ...report]);

    return newStatuses;
  };

  return { getNewStatuses };
};

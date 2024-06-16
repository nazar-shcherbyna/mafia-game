import { useGameStore } from '@/app/store';
import { getActionsObjCount, getNotUsedNightActions } from '../utils';
import { useGetCurrentDayOrNightStore } from './useGetCurrentDayOrNightStore';

export const useDisableNextRound = (): {
  isDisabledDayRound: boolean;
  isDisabledNightRound: boolean;
} => {
  const round = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);
  const { playersStore } = useGetCurrentDayOrNightStore();

  const gamePlayers = playersStore[round];

  const notUsedNightActions = getNotUsedNightActions(gamePlayers);
  const isDisabledNightRound = Object.keys(notUsedNightActions).length > 0;

  const actionsObjCount = getActionsObjCount(playersStore[round]);
  const isDisabledDayRound =
    round !== 0 && !actionsObjCount?.killed_by_day_vote;

  return {
    isDisabledDayRound: isNight ? false : isDisabledDayRound,
    isDisabledNightRound: isNight ? isDisabledNightRound : false,
  };
};

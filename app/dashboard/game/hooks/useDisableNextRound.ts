import { useGameStore } from '@/app/store';
import { getActionsCount, getNotUsedNightActions } from '../utils';
import { useGetCurrentDayOrNightStore } from './hooks';

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

  console.log(getActionsCount(playersStore[round]));

  const isDisabledDayRound =
    round !== 0 && !getActionsCount(playersStore[round]).KILLED_BY_DAY_VOTE;

  return {
    isDisabledDayRound: isNight ? false : isDisabledDayRound,
    isDisabledNightRound: isNight ? isDisabledNightRound : false,
  };
};

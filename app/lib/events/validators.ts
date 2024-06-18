import { DBGameStatusEnum } from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';

export function validateFinishEvent(eventGames: DBGameType[]) {
  if (eventGames.length === 0) {
    return {
      message: 'Event has no games.',
      disableAction: true,
    };
  }

  const hasEventActiveGame = eventGames.some(
    (game) => game.status === DBGameStatusEnum.started,
  );
  if (hasEventActiveGame) {
    return {
      message: 'Event has active game.',
      disableAction: true,
    };
  }

  return {
    disableAction: false,
  };
}

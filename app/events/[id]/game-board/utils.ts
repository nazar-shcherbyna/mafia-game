import { GAME_PLAYER_STATUS } from '@/app/dashboard/game/constans';
import {
  GamePlayerRolesKeysType,
  GamePlayerStatusKeysType,
  type PlayerGameDictType,
} from '@/app/dashboard/game/types';

export const findGamePlayerBySitPlace = (
  sitPlace: number,
  gamePlayers: PlayerGameDictType,
) => {
  const [playerId, player] = Object.entries(gamePlayers).find(
    ([id, player]) => player.sitPlace === sitPlace,
  ) || [undefined, undefined];
  return { playerId, player };
};

export const getAliveRolesObjCount = (
  gamePlayers: PlayerGameDictType,
): Record<GamePlayerRolesKeysType, number> | null => {
  if (!gamePlayers) return null;

  return Object.values(gamePlayers)
    .filter((player) => !GAME_PLAYER_STATUS[player.status].isDeadly)
    .map((player) => player.role)
    .reduce(
      (acc, role) => {
        if (!acc[role]) acc[role] = 1;
        else acc[role] = acc[role] + 1;
        return acc;
      },
      {} as Record<GamePlayerRolesKeysType, number>,
    );
};

export const getActionsObjCount = (
  players: PlayerGameDictType,
): Record<GamePlayerStatusKeysType, number> | null => {
  if (!players) return null;

  const allActionsByGameRound = Object.values(players).map(
    (player) => player.actions,
  );

  return allActionsByGameRound.flat().reduce(
    (acc, action) => {
      if (!acc[action]) acc[action] = 1;
      else acc[action] = acc[action] + 1;
      return acc;
    },
    {} as Record<GamePlayerStatusKeysType, number>,
  );
};

export const checkWinner = (gamePlayers: PlayerGameDictType) => {
  const rolesDict = getAliveRolesObjCount(gamePlayers);
  if (rolesDict === null || !Object.values(rolesDict).length) return;

  const alive = Object.values(rolesDict).reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);

  if ((rolesDict.mafia || 0 + rolesDict.don || 0 + rolesDict.hooker || 0) === 0)
    window.alert('CIVILIAN WIN');
  if (
    (rolesDict.civilian ||
      0 + rolesDict.detective ||
      0 + rolesDict.doctor ||
      0) === 0
  )
    window.alert('MAFIA WIN');
  if (alive <= 2 && rolesDict.killer) window.alert('KILLER WIN'); // Wins when among final 2 alive
};

export const getNotUsedNightActions = (gamePlayers: PlayerGameDictType) => {
  const currentRolesObjCount = getAliveRolesObjCount(gamePlayers);
  const currentActionsObjCount = getActionsObjCount(gamePlayers || []);
  const nightActions = Object.entries(GAME_PLAYER_STATUS).filter(
    ([_, actionProperties]) => actionProperties.isNightAction,
  );

  const nightActionsWithAliveOwners = nightActions.filter(
    ([_, actionProperties]) => {
      const aliveActionOwners = actionProperties.owners.filter(
        (owner) =>
          currentRolesObjCount !== null && currentRolesObjCount[owner] > 0,
      );

      return aliveActionOwners.length > 0;
    },
  );

  const remainingNightActions = nightActionsWithAliveOwners.filter(
    ([actionName]) => {
      const isNightActionOnTheTabe =
        currentActionsObjCount !== null &&
        !!currentActionsObjCount[actionName as GamePlayerStatusKeysType];
      return !isNightActionOnTheTabe;
    },
  );

  return Object.fromEntries(remainingNightActions);
};

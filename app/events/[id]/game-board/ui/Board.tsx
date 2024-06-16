'use client';

import { DBGameType } from '@/app/@types/db-types';
import { SitEditor } from '@/app/events/[id]/game-board/ui/SitEditor';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import {
  checkIfAllPlayersWithRoleMadeAction,
  checkIfPositionIsActive,
  gameBoardValidator,
} from '@/app/lib/game-board/validators';
import { useGameStore } from '@/app/store';
import React, { Suspense } from 'react';
import { PlayerDotWrapper } from './PlayerDot';
import { RoundReport } from './RoundReport';

export const Board: React.FC<{
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
  gameBoardValidation: ReturnType<typeof gameBoardValidator>;
}> = ({ gamePlayers, game, gameBoardValidation }) => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);
  const isOpenRoundReport = useGameStore((state) => state.isOpenRoundReport);

  React.useEffect(() => {
    setSelectedSit(null);
  }, [setSelectedSit]);

  const getPlayerBySitPlace = (place: number) => {
    return gamePlayers.find(
      (player) => Number(player.position_number) === place,
    );
  };

  const playersThatMadeAction =
    checkIfAllPlayersWithRoleMadeAction(gamePlayers);

  return (
    <div className="relative h-[150px] w-[300px] rounded-[60px] border-[20px] border-white-400 sm:h-[250px] sm:w-[500px] md:h-[370px] md:w-[640px] lg:h-[450px] lg:w-[900px]">
      <div className="absolute left-1/2 top-1/2 h-2/3 w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto">
        {selectedSit && (
          <Suspense fallback={<div>Loading...</div>}>
            <SitEditor
              position={selectedSit}
              gamePlayers={gamePlayers}
              game={game}
              gameBoardValidation={gameBoardValidation}
            />
          </Suspense>
        )}
        {!selectedSit && isOpenRoundReport && (
          <RoundReport game={game} gamePlayers={gamePlayers} />
        )}
      </div>

      <PlayersRow>
        {Array.from({ length: 5 }, (_, index) => {
          const player = getPlayerBySitPlace(1 + index);

          return (
            <PlayerDotWrapper
              key={index}
              index={1 + index}
              player={player}
              labelPosition="bottom"
              isActivePosition={checkIfPositionIsActive(
                gameBoardValidation.passedConditions,
                player,
              )}
              isPlayerMadeAction={
                player &&
                playersThatMadeAction.actionsArray.includes(player.game_role)
              }
            />
          );
        })}
      </PlayersRow>

      <PlayersColumn right>
        {Array.from({ length: 3 }, (_, index) => {
          const player = getPlayerBySitPlace(6 + index);
          return (
            <PlayerDotWrapper
              key={index}
              index={6 + index}
              player={player}
              labelPosition="right"
              isActivePosition={checkIfPositionIsActive(
                gameBoardValidation.passedConditions,
                player,
              )}
              isPlayerMadeAction={
                player &&
                playersThatMadeAction.actionsArray.includes(player.game_role)
              }
            />
          );
        })}
      </PlayersColumn>

      <PlayersRow bottom>
        {Array.from({ length: 5 }, (_, index) => {
          const player = getPlayerBySitPlace(9 + index);
          return (
            <PlayerDotWrapper
              key={index}
              index={9 + index}
              player={player}
              labelPosition="bottom"
              isActivePosition={checkIfPositionIsActive(
                gameBoardValidation.passedConditions,
                player,
              )}
              isPlayerMadeAction={
                player &&
                playersThatMadeAction.actionsArray.includes(player.game_role)
              }
            />
          );
        })}
      </PlayersRow>

      <PlayersColumn>
        {Array.from({ length: 3 }, (_, index) => {
          const player = getPlayerBySitPlace(14 + index);
          return (
            <PlayerDotWrapper
              key={index}
              index={14 + index}
              player={player}
              labelPosition="left"
              isActivePosition={checkIfPositionIsActive(
                gameBoardValidation.passedConditions,
                player,
              )}
              isPlayerMadeAction={
                player &&
                playersThatMadeAction.actionsArray.includes(player.game_role)
              }
            />
          );
        })}
      </PlayersColumn>
    </div>
  );
};

const PlayersRow = ({
  children,
  bottom,
}: {
  children?: React.ReactNode;
  bottom?: boolean;
}) => (
  <div
    className={`absolute ${
      bottom ? 'bottom-[-11px]' : 'top-[-11px]'
    } flex h-[2px] w-full ${
      bottom ? 'flex-row-reverse' : 'flex-row'
    } items-center justify-between px-[5vw]`}
  >
    {children}
  </div>
);

const PlayersColumn = ({
  children,
  right,
}: {
  children?: React.ReactNode;
  right?: boolean;
}) => (
  <div
    className={`absolute ${
      right ? 'right-[-11px]' : 'left-[-11px]'
    } flex h-full w-[2px] ${
      right ? 'flex-col' : 'flex-col-reverse'
    } items-center justify-between py-[2vw]`}
  >
    {children}
  </div>
);

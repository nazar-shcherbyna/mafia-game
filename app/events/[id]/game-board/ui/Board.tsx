import { DBGameType } from '@/app/@types/db-types';
import { SitEditor } from '@/app/events/[id]/game-board/ui/SitEditor';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { useGameStore } from '@/app/store';
import { Suspense } from 'react';

export const Board: React.FC<{
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}> = ({ gamePlayers, game }) => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  // const roundReport = useGameStore((state) => state.roundReport);

  const getPlayerBySitPlace = (place: number) => {
    return gamePlayers.find(
      (player) => Number(player.position_number) === place,
    );
  };

  return (
    <div className="relative h-[150px] w-[300px] rounded-[60px] border-[20px] border-white-400 sm:h-[250px] sm:w-[500px] md:h-[370px] md:w-[640px] lg:h-[450px] lg:w-[900px]">
      <div className="absolute left-1/2 top-1/2 h-2/3 w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto">
        {selectedSit && (
          <Suspense fallback={<div>Loading...</div>}>
            <SitEditor
              position={selectedSit}
              gamePlayers={gamePlayers}
              game={game}
            />
          </Suspense>
        )}
        {/* {!selectedSit && !!roundReport.length && <RoundReport />} */}
      </div>

      <PlayersRow>
        {Array.from({ length: 5 }, (_, index) => (
          <PlayerDotWrapper
            key={index}
            index={1 + index}
            player={getPlayerBySitPlace(1 + index)}
            labelPosition="bottom"
          />
        ))}
      </PlayersRow>

      <PlayersColumn right>
        {Array.from({ length: 3 }, (_, index) => (
          <PlayerDotWrapper
            key={index}
            index={6 + index}
            player={getPlayerBySitPlace(6 + index)}
            labelPosition="right"
          />
        ))}
      </PlayersColumn>

      <PlayersRow bottom>
        {Array.from({ length: 5 }, (_, index) => (
          <PlayerDotWrapper
            key={index}
            index={9 + index}
            player={getPlayerBySitPlace(9 + index)}
            labelPosition="bottom"
          />
        ))}
      </PlayersRow>

      <PlayersColumn>
        {Array.from({ length: 3 }, (_, index) => (
          <PlayerDotWrapper
            key={index}
            index={14 + index}
            player={getPlayerBySitPlace(14 + index)}
            labelPosition="left"
          />
        ))}
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

const PlayerDotWrapper = ({
  index,
  player,
  labelPosition = 'bottom',
}: {
  index: number;
  player?: FetchGamePlayerType;
  labelPosition?: 'bottom' | 'left' | 'right';
}) => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);

  // const day = useGameStore((state) => state.day);
  // const { playersStore } = useGetCurrentDayOrNightStore();
  // const gamePlayers = playersStore[day] || {};
  // const { player } = findGamePlayerBySitPlace(index, gamePlayers);

  return (
    <PlayerDot
      index={index}
      // bgColor={player?.role ? GAME_ROLES[player.role].color : 'bg-white-400'}
      bgColor={'bg-white-400'}
      // opacity={
      //   player?.status
      //     ? GAME_PLAYER_STATUS[player.status].opacity
      //     : 'opacity-100'
      // }
      opacity={'opacity-100'}
      onClick={() => setSelectedSit(index)}
      selected={selectedSit === index}
      player={player}
      labelPosition={labelPosition}
    />
  );
};

const PlayerDot = ({
  index,
  onClick,
  selected,
  bgColor,
  opacity,
  player,
  labelPosition = 'bottom',
}: {
  index: number;
  onClick: () => void;
  selected: boolean;
  bgColor: string;
  opacity: string;
  player?: FetchGamePlayerType;
  labelPosition?: 'bottom' | 'left' | 'right';
}) => {
  const labelPositionClass = {
    bottom: 'bottom-0 translate-y-[100%]',
    left: 'left-0 top-1/2 translate-x-[-100%] translate-y-[-50%]',
    right: 'right-0 top-1/2 translate-x-[100%] translate-y-[-50%]',
  }[labelPosition || 'bottom'];

  return (
    <button
      onClick={onClick}
      className={`relative block h-[50px] w-[50px] text-center sm:h-[60px] sm:w-[60px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] ${bgColor} ${opacity} rounded-full text-xs text-blue-400 hover:bg-white-500 sm:text-sm ${
        selected ? 'border-[2px] border-blue-400' : ''
      }`}
    >
      {index}. {player?.role || '---'}
      <span
        className={`absolute block w-full text-base font-semibold text-[#CFD3EC] ${labelPositionClass}`}
      >
        {player?.nickname}
      </span>
    </button>
  );
};

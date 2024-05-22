import { GAME_PLAYER_STATUS, GAME_ROLES } from '@/app/dashboard/game/constans';
import { useGetCurrentDayOrNightStore } from '@/app/dashboard/game/hooks/hooks';
import { RoundReport } from '@/app/dashboard/game/ui/RoundReport';
import { SitEditor } from '@/app/dashboard/game/ui/SitEditor';
import { findGamePlayerBySitPlace } from '@/app/dashboard/game/utils';
import { useGameStore } from '@/app/store';
import { GamePlayerRolesKeysType } from '../types';

export const Board = () => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  const roundReport = useGameStore((state) => state.roundReport);

  return (
    <div className="relative mb-[7vw] h-[calc(80vw/2)] w-[80vw] rounded-[7vw] border-[20px] border-white-400">
      <div className="absolute left-1/2 top-1/2 h-[calc(80vw/3)] w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto pr-2">
        {selectedSit && <SitEditor />}
        {!!roundReport.length && <RoundReport />}
      </div>
      {/* [-11px] - border-[20px] / 2 + h-[2px]/2 = 11px */}
      <PlayersRow>
        {Array(5)
          .fill(null)
          .map((item, index) => (
            <PlayerDotWrapper key={index} index={1 + index}></PlayerDotWrapper>
          ))}
      </PlayersRow>

      <PlayersColumn right>
        {Array(3)
          .fill(null)
          .map((item, index) => (
            <PlayerDotWrapper key={index} index={6 + index}></PlayerDotWrapper>
          ))}
      </PlayersColumn>

      <PlayersRow bottom>
        {Array(5)
          .fill(null)
          .map((item, index) => (
            <PlayerDotWrapper key={index} index={9 + index}></PlayerDotWrapper>
          ))}
      </PlayersRow>

      <PlayersColumn>
        {Array(3)
          .fill(null)
          .map((item, index) => (
            <PlayerDotWrapper key={index} index={14 + index}></PlayerDotWrapper>
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

const PlayerDotWrapper = ({ index }: { index: number }) => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);

  const day = useGameStore((state) => state.day);
  const { playersStore } = useGetCurrentDayOrNightStore();
  const gamePlayers = playersStore[day] || {};
  const { player } = findGamePlayerBySitPlace(index, gamePlayers);

  return (
    <PlayerDot
      index={index}
      bgColor={player?.role ? GAME_ROLES[player.role].color : 'bg-white-400'}
      opacity={
        player?.status
          ? GAME_PLAYER_STATUS[player.status].opacity
          : 'opacity-100'
      }
      onClick={() => setSelectedSit(index)}
      selected={selectedSit === index}
      role={player?.role}
    />
  );
};

const PlayerDot = ({
  index,
  onClick,
  selected,
  bgColor,
  opacity,
  role,
}: {
  index: number;
  onClick: () => void;
  selected: boolean;
  bgColor: string;
  opacity: string;
  role?: GamePlayerRolesKeysType;
}) => (
  <button
    onClick={onClick}
    className={`h-[7vw] w-[7vw] ${bgColor} ${opacity} rounded-full text-blue-400 hover:bg-white-500 ${
      selected ? 'border-[2px] border-blue-400' : ''
    }`}
  >
    {index} - {role || 'EMPTY'}
  </button>
);

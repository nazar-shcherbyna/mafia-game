import { DBGamePlayerRoleEnum } from '@/app/@types/db-enums';
import { DBGamePlayerType, DBUserType } from '@/app/@types/db-types';
import { useGetCurrentDayOrNightStore } from '@/app/dashboard/game/hooks/hooks';

export const Board: React.FC<{
  players: Pick<DBUserType & DBGamePlayerType, 'id' | 'nickname' | 'role'>[];
}> = ({ players }) => {
  // const selectedSit = useGameStore((state) => state.selectedSit);
  // const roundReport = useGameStore((state) => state.roundReport);

  return (
    <div className="relative h-[150px] w-[300px] rounded-[60px] border-[20px] border-white-400 sm:h-[250px] sm:w-[500px] md:h-[370px] md:w-[640px] lg:h-[450px] lg:w-[900px]">
      <div className="absolute left-1/2 top-1/2 h-2/3 w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto">
        {/* {selectedSit && <SitEditor />}
        {!selectedSit && !!roundReport.length && <RoundReport />} */}
      </div>
      {/* <PlayersRow>
        {Array.from({ length: 5 }, (_, index) => (
          <PlayerDotWrapper key={index} index={1 + index}></PlayerDotWrapper>
        ))}
      </PlayersRow>

      <PlayersColumn right>
        {Array.from({ length: 3 }, (_, index) => (
          <PlayerDotWrapper key={index} index={6 + index}></PlayerDotWrapper>
        ))}
      </PlayersColumn>

      <PlayersRow bottom>
        {Array.from({ length: 5 }, (_, index) => (
          <PlayerDotWrapper key={index} index={9 + index}></PlayerDotWrapper>
        ))}
      </PlayersRow>

      <PlayersColumn>
        {Array.from({ length: 3 }, (_, index) => (
          <PlayerDotWrapper key={index} index={14 + index}></PlayerDotWrapper>
        ))}
      </PlayersColumn> */}
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
  // const selectedSit = useGameStore((state) => state.selectedSit);
  // const setSelectedSit = useGameStore((state) => state.setSelectedSit);

  // const day = useGameStore((state) => state.day);
  const { playersStore } = useGetCurrentDayOrNightStore();
  // const gamePlayers = playersStore[day] || {};
  // const { player } = findGamePlayerBySitPlace(index, gamePlayers);

  // return (
  //   <PlayerDot
  //     index={index}
  //     bgColor={player?.role ? GAME_ROLES[player.role].color : 'bg-white-400'}
  //     opacity={
  //       player?.status
  //         ? GAME_PLAYER_STATUS[player.status].opacity
  //         : 'opacity-100'
  //     }
  //     onClick={() => setSelectedSit(index)}
  //     selected={selectedSit === index}
  //     role={player?.role}
  //   />
  // );
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
  role?: DBGamePlayerRoleEnum;
}) => (
  <button
    onClick={onClick}
    className={`h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] ${bgColor} ${opacity} rounded-full text-xs text-blue-400 hover:bg-white-500 sm:text-sm ${
      selected ? 'border-[2px] border-blue-400' : ''
    }`}
  >
    {index}. {role || 'EMPTY'}
  </button>
);

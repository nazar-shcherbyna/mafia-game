import { DBGameRoundPlayerStatusEnum } from '@/app/@types/db-enums';

import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { useGameStore } from '@/app/store';
import {
  BanknotesIcon,
  CheckIcon,
  EyeDropperIcon,
  HeartIcon,
  HomeIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { GAME_ROLES_DATA } from '../constans';

export const PlayerDotWrapper = ({
  index,
  player,
  labelPosition = 'bottom',
  isActivePosition = true,
  isPlayerMadeAction = false,
}: {
  index: number;
  player?: FetchGamePlayerType;
  labelPosition?: 'bottom' | 'left' | 'right';
  isActivePosition?: boolean;
  isPlayerMadeAction?: boolean;
}) => {
  const selectedSit = useGameStore((state) => state.selectedSit);
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);
  const setIsOpenRoundReport = useGameStore(
    (state) => state.setIsOpenRoundReport,
  );

  return (
    <PlayerDot
      index={index}
      onClick={() => {
        setSelectedSit(index);
        setIsOpenRoundReport(false);
      }}
      selected={selectedSit === index}
      player={player}
      labelPosition={labelPosition}
      isActivePosition={isActivePosition}
      isPlayerMadeAction={isPlayerMadeAction}
    />
  );
};

export const PlayerDot = ({
  index,
  onClick,
  selected,
  player,
  labelPosition = 'bottom',
  isActivePosition = true,
  isPlayerMadeAction = false,
}: {
  index: number;
  onClick: () => void;
  selected: boolean;
  player?: FetchGamePlayerType;
  labelPosition?: 'bottom' | 'left' | 'right';
  isActivePosition?: boolean;
  isPlayerMadeAction?: boolean;
}) => {
  const labelPositionClass = {
    bottom: '-bottom-1 translate-y-[100%]',
    left: '-left-1 top-1/2 translate-x-[-100%] translate-y-[-50%]',
    right: '-right-1 top-1/2 translate-x-[100%] translate-y-[-50%]',
  }[labelPosition || 'bottom'];
  const actionsStateClass = {
    bottom: '-top-1 -translate-y-full',
    left: '-right-1 top-1/2 translate-x-full -translate-y-1/2 flex-col',
    right: '-left-1 top-1/2 -translate-x-full -translate-y-1/2 flex-col',
  }[labelPosition || 'bottom'];

  const opacityClass = isActivePosition ? 'opacity-100' : 'opacity-50';

  const playerRoleData = player?.game_role
    ? GAME_ROLES_DATA[player.game_role]
    : null;

  const RoleIcon = playerRoleData?.icon;
  const roleClasses = playerRoleData?.classes || 'bg-[#68709B]';
  const roleIconClasses =
    playerRoleData?.iconClasses +
    (player?.is_alive ? ' opacity-100' : ' opacity-50');

  return (
    <button
      onClick={onClick}
      className={`relative flex h-[50px] w-[50px] items-center justify-center
        text-center sm:h-[60px] sm:w-[60px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] 
        ${roleClasses}
        ${opacityClass}
        ${player?.is_alive ? 'bg-opacity-100' : 'bg-opacity-50'}
        rounded-full text-xs hover:bg-white-500 sm:text-sm ${
          selected ? 'border-[2px] border-blue-400' : ''
        }`}
      disabled={player?.is_alive === false}
    >
      {RoleIcon && <RoleIcon className={roleIconClasses} />}
      <span
        className={`absolute block w-full text-base font-semibold text-[#CFD3EC] ${labelPositionClass}`}
      >
        {index}. {player ? player.nickname : '-'}
      </span>

      {player && (
        <span
          className={`absolute flex items-center justify-center text-base font-semibold text-[#CFD3EC] ${actionsStateClass}`}
        >
          {isPlayerMadeAction && player.is_alive && (
            <CheckIcon className="h-5 w-5" />
          )}

          {player?.player_status ===
            DBGameRoundPlayerStatusEnum.hilled_by_doctor && (
            <PlusIcon className="h-5 w-5" />
          )}
          {player?.player_status === DBGameRoundPlayerStatusEnum.hooked && (
            <HeartIcon className="h-5 w-5" />
          )}
          {player?.player_status ===
            DBGameRoundPlayerStatusEnum.killed_by_mafia && (
            <BanknotesIcon className="h-5 w-5" />
          )}
          {player?.player_status ===
            DBGameRoundPlayerStatusEnum.killed_by_killer && (
            <EyeDropperIcon className="h-5 w-5 rotate-180" />
          )}
          {player?.player_status ===
            DBGameRoundPlayerStatusEnum.checked_by_detective && (
            <StarIcon className="h-5 w-5" />
          )}
          {player.player_status ===
            DBGameRoundPlayerStatusEnum.killed_by_day_vote && (
            <HomeIcon className="h-5 w-5" />
          )}
        </span>
      )}
    </button>
  );
};

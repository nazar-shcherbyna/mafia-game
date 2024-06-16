import { useGetCurrentDayOrNightStore } from '@/app/dashboard/game/hooks/hooks';
import { useGameStore } from '@/app/store';

export const SitEditor = () => {
  const selectedSit = useGameStore((state) => state.selectedSit)!;
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);
  const registeredPlayers = useGameStore((state) => state.registeredPlayers);

  const day = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);

  const { playersStore, setPlayersStore } = useGetCurrentDayOrNightStore();
  const gamePlayers = playersStore[day];

  // const { player: currentPlayer, playerId: currentPlayerId } =
  //   findGamePlayerBySitPlace(selectedSit, gamePlayers || {});
  // const [playerId, setPlayerId] = useState<string>(currentPlayerId || '');
  // const [role, setRole] = useState<GamePlayerRolesKeysType>(
  //   currentPlayer?.role || DBGamePlayerRoleEnum.civilian,
  // );
  // const [status, setStatus] = useState<GamePlayerStatusKeysType>(
  //   currentPlayer?.status || DBGameRoundPlayerStatusEnum.alive,
  // );

  // const [actions, setActions] = useState<GamePlayerStatusKeysType[]>(
  //   gamePlayers?.[playerId]?.actions || [],
  // );

  // const [isPersonalDataEditable, setIsPersonalDataEditable] = useState<boolean>(
  //   day === 0,
  // );

  // const currentRolesObjCount = getAliveRolesObjCount(gamePlayers);
  // const currentActionsObjCount = getActionsObjCount(gamePlayers || []);

  // const saveHandler = () => {
  //   const playersStore_ = [...playersStore];
  //   playersStore[day][playerId] = {
  //     sitPlace: selectedSit!,
  //     role,
  //     status,
  //     actions,
  //   };
  //   setPlayersStore(playersStore_);

  //   setSelectedSit(undefined);
  // };

  // const actionChangeHandler = (
  //   index: number,
  //   value: GamePlayerStatusKeysType,
  // ) => {
  //   setActions((actions) => {
  //     const actions_ = [...actions];
  //     actions_[index] = value;
  //     return actions_;
  //   });
  // };

  // const deleteActionHandler = (index: number) => {
  //   setActions((actions) => {
  //     const actions_ = [...actions];
  //     actions_.splice(index, 1);
  //     return actions_;
  //   });
  // };

  return (
    <div className="">
      <PropertyWrapper>Edit Place: {selectedSit}</PropertyWrapper>

      <div className="my-5 flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          {/* <PropertyWrapper>
            Player name:{' '}
            <UiSelect
              className=""
              disabled={!isPersonalDataEditable}
              aria-disabled={!isPersonalDataEditable}
              onChange={(event) => setPlayerId(event.target.value)}
              defaultValue={playerId}
            >
              <option value={''}>EMPTY</option>
              {registeredPlayers.map((player, index) => (
                <option
                  // className={clsx({
                  //   ['text-amber-600']: ,
                  // })}
                  key={player.id}
                  value={player.id}
                  disabled={!!gamePlayers[player.id]}
                >
                  {player.nickname}
                </option>
              ))}
            </UiSelect>
          </PropertyWrapper> */}
          {/* <PropertyWrapper>
            Role:
            <UiSelect
              className=""
              disabled={!isPersonalDataEditable}
              aria-disabled={!isPersonalDataEditable}
              onChange={(event) =>
                setRole(event.target.value as GamePlayerRolesKeysType)
              }
              defaultValue={role}
            >
              {Object.entries(GAME_ROLES).map(([role, properties], index) => (
                <option
                  disabled={
                    !!!(
                      properties.max >
                      (currentRolesObjCount
                        ? currentRolesObjCount[role as GamePlayerRolesKeysType]
                        : 0)
                    )
                  }
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </UiSelect>
          </PropertyWrapper> */}

          {/* <PropertyWrapper>
            Status:
            <UiSelect
              disabled={!isPersonalDataEditable}
              aria-disabled={!isPersonalDataEditable}
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as GamePlayerStatusKeysType)
              }
            >
              {Object.entries(GAME_PLAYER_STATUS).map(
                ([status, properties], index) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ),
              )}
            </UiSelect>
          </PropertyWrapper> */}

          {/* <PropertyWrapper>
            Edit disabled:{' '}
            <UiCheckbox
              className=""
              onChange={() => setIsPersonalDataEditable((s) => !s)}
              defaultChecked={!isPersonalDataEditable}
            ></UiCheckbox>
          </PropertyWrapper> */}
        </div>

        <div className="">
          Actions:
          {/* {actions.map((action, index) => (
            <PropertyWrapper key={index}>
              Action {index + 1}:
              <UiSelect
                className=""
                value={action}
                onChange={(event) =>
                  actionChangeHandler(
                    index,
                    event.target.value as GamePlayerStatusKeysType,
                  )
                }
              >
                {Object.entries(GAME_PLAYER_STATUS).map(
                  ([status, properties], index) => (
                    <option
                      key={status}
                      value={status}
                      disabled={
                        !!!(
                          properties.maxQuantity >
                          (currentActionsObjCount
                            ? currentActionsObjCount[
                                status as GamePlayerStatusKeysType
                              ]
                            : 0)
                        ) ||
                        !!!properties.owners.filter(
                          (owner) =>
                            currentRolesObjCount && currentRolesObjCount[owner],
                        ).length ||
                        !(
                          properties.isNightAction === isNight ||
                          properties.isNightAction === undefined
                        )
                      }
                    >
                      {status}
                    </option>
                  ),
                )}
              </UiSelect>
              <UiButton onClick={() => deleteActionHandler(index)}>X</UiButton>
            </PropertyWrapper>
          ))} */}
        </div>
      </div>

      {/*   <PropertyWrapper>
        <UiButton onClick={() => setSelectedSit(undefined)}>Close</UiButton>
        <UiButton
          onClick={() =>
            setActions((ac) => [...ac, DBGameRoundPlayerStatusEnum.alive])
          }
          disabled={!day || !playerId}
          aria-disabled={!day || !playerId}
        >
          Add Action
        </UiButton>
        <UiButton onClick={saveHandler}>Save</UiButton>
      </PropertyWrapper> */}
    </div>
  );
};

const PropertyWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full items-center justify-between gap-2">
    {children}
  </div>
);

import { GameBoard } from '@/app/dashboard/game/GameBoard';
import { getRegisteredGamePlayers } from '@/app/dashboard/game/service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game',
};

export default async function GamePage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;

  const registeredPlayers = await getRegisteredGamePlayers(gameId)

  return (
    <div className="flex items-center justify-center">
      <GameBoard gameId={gameId} registeredPlayers={registeredPlayers} />
    </div>
  );
}

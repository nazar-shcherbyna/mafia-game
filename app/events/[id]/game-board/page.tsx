import { fetchUser } from '@/app/lib/data';
import {
  fetchEvent,
  fetchEventModerator,
  fetchEventStartedGames,
} from '@/app/lib/events/fetch';
import { fetchGamePlayers } from '@/app/lib/game-board/fetch';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { GameBoard } from './GameBoard';

export const metadata: Metadata = {
  title: 'Game board',
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session ? await fetchUser(session.user.id) : null;
  const event = await fetchEvent(params.id);
  const eventModerator = await fetchEventModerator(params.id);
  const eventActiveGames = await fetchEventStartedGames(params.id);
  const activeGame = eventActiveGames[0];

  if (
    event === null ||
    user === null ||
    eventModerator === null ||
    activeGame === undefined
  ) {
    return <div>Game not found.</div>;
  }

  const gamePlayers = await fetchGamePlayers(activeGame.id);

  return (
    <div>
      <GameBoard game={activeGame} gamePlayers={gamePlayers} />
    </div>
  );
}

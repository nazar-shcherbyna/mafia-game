import { fetchUser } from '@/app/lib/data';
import { auth } from '@/auth';
import type { Metadata } from 'next';
import {
  fetchCountOfPlayerIdInEvent,
  fetchEvent,
  fetchEventGames,
  fetchEventModerator,
  fetchEventPlayers,
} from '../../lib/events/fetch';
import { EventCard } from '../../ui/events/event-card';

export const metadata: Metadata = {
  title: 'Event card',
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session ? await fetchUser(session.user.id) : null;
  const event = await fetchEvent(params.id);
  const eventPlayers = user ? await fetchEventPlayers(params.id) : [];
  const countOfPlayerIdInEvent = user
    ? await fetchCountOfPlayerIdInEvent(params.id, user.id)
    : null;
  const eventModerator = await fetchEventModerator(params.id);
  const eventGames = await fetchEventGames(params.id);

  if (event === null || user === null || eventModerator === null) {
    return <div>Event not found.</div>;
  }

  return (
    <EventCard
      event={event}
      user={user}
      eventPlayers={eventPlayers}
      eventModerator={eventModerator}
      countOfPlayerIdInEvent={countOfPlayerIdInEvent}
      eventGames={eventGames}
    />
  );
}

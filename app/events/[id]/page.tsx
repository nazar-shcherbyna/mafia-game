import { EventCard } from '@/app/events/components/event-card';
import { fetchUser } from '@/app/lib/data';
import {
  fetchCountOfPlayerIdInEvent,
  fetchEvent,
  fetchEventGames,
  fetchEventModerator,
  fetchEventPlayers,
} from '@/app/lib/events/fetch';
import { auth } from '@/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event card',
};

export default async function Page({ params }: { params: { id: string } }) {
  const [session, event, eventModerator, eventGames] = await Promise.all([
    auth(),
    fetchEvent(params.id),
    fetchEventModerator(params.id),
    fetchEventGames(params.id),
  ]);

  const user = session ? await fetchUser(session.user.id) : null;

  const [eventPlayers, countOfPlayerIdInEvent] = await Promise.all([
    user ? fetchEventPlayers(params.id) : [],
    user ? fetchCountOfPlayerIdInEvent(params.id, user.id) : null,
  ]);

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

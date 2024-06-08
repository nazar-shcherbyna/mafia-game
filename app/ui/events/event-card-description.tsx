import { EventType } from '@/app/@types/events';
import { UserType } from '@/app/@types/users';
import Image from 'next/image';

export const EventCardDescription: React.FC<{
  user: UserType;
  event: EventType;
  eventModerator: Pick<UserType, 'id' | 'nickname'>;
}> = ({ user, event, eventModerator }) => {
  return (
    <div className="mb-6 flex items-start gap-6">
      <Image
        width={200}
        height={200}
        src="/dev-create-game.png"
        alt="create-game-title"
        className="mb-1"
      />
      <div>
        <LabelWithValueView label="Event name" value={event.title} />
        <LabelWithValueView
          label="Date & Time"
          value={event.date.toLocaleString()}
        />
        <LabelWithValueView label="Location" value={event.location} />
        <LabelWithValueView
          label="Moderator"
          value={`${eventModerator.nickname} ${
            eventModerator.id === user.id ? ' (You)' : ''
          }`}
        />
      </div>
    </div>
  );
};

function LabelWithValueView({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-3">
      <h3 className="mb-1 text-base font-semibold text-[#CFD3EC]">{label}</h3>
      <p className="text-lg font-normal text-[#746BD4]">{value}</p>
    </div>
  );
}

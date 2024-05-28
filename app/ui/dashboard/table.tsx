import { EventType } from '@/app/events/types';
import { UiStatus } from '../atoms/status';
import { UiLink } from '../link';

export const GamesTable: React.FC<{
  columns: string[];
  data: EventType[];
  className?: string;
}> = ({ columns, data, className }) => {
  return (
    <div
      className="
        w-full
        overflow-hidden
        overflow-x-auto
        rounded-xl
        border-[1px]
        border-[#68709B] 
        bg-[#393C51]
        text-[#CFD3EC]"
    >
      <table
        className={`
        ${className}
        w-full
        border-collapse
        divide-y-[1px]
        divide-[#68709B]
        text-sm
      `}
      >
        <thead>
          <tr className="uppercase">
            <th className="min-w-[150px] px-6 py-3.5 text-start">Game name</th>
            <th className="min-w-[100px] px-6 py-3.5 text-start">Location</th>
            <th className="px-6 py-3.5 text-start">Status</th>
            <th className="px-6 py-3.5 text-start">Players</th>
            <th className="px-6 py-3.5 text-start">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#1F2233]">
          {data.map((event) => (
            <tr className="border-b-[1px] border-[#68709B]" key={event.id}>
              <td className="px-6 py-3.5">{event.title}</td>
              <td className="px-6 py-3.5 capitalize">{event.location}</td>
              <td className="px-6 py-3.5">
                <UiStatus status={event.status} />
              </td>
              <td className="px-6 py-3.5">9/12</td>
              <td className="px-6 py-3.5">
                <UiLink
                  className="rounded-md px-5 py-1.5 text-xs font-medium"
                  href={`/events/${event.id}`}
                >
                  View
                </UiLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

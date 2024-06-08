import { EventType } from '@/app/@types/events';

export const UiEventStatus: React.FC<{
  status: EventType['status'];
}> = ({ status }) => {
  if (status === 'in-progress') {
    return (
      <span className="rounded-full bg-[#203C3D] px-5 py-1.5 capitalize text-[#28C76F]">
        {status}
      </span>
    );
  }

  if (status === 'completed') {
    return (
      <span className="rounded-full bg-[#3F2A38] px-5 py-1.5 capitalize text-[#EA5455]">
        {status}
      </span>
    );
  }

  if (status === 'created') {
    return (
      <span className="rounded-full bg-[#2D3748] px-5 py-1.5 capitalize text-[#F6E05E]">
        {status}
      </span>
    );
  }

  return null;
};

import { EventStatusType } from '@/app/@types/events';

export const UiStatus: React.FC<{
  status: EventStatusType;
}> = ({ status }) => {
  if (status === 'in-process') {
    return (
      <span className="rounded-full bg-[#203C3D] px-5 py-1.5 capitalize text-[#28C76F]">
        {status}
      </span>
    );
  }

  if (status === 'finished') {
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

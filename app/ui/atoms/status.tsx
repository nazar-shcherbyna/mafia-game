import { DBEventStatusEnum } from '@/app/@types/db-enums';
import { DBEventType } from '@/app/@types/db-types';

export const UiEventStatus: React.FC<{
  status: DBEventType['status'];
}> = ({ status }) => {
  if (status === DBEventStatusEnum.inProgress) {
    return (
      <span className="rounded-full bg-[#203C3D] px-5 py-1.5 capitalize text-[#28C76F]">
        {status}
      </span>
    );
  }

  if (status === DBEventStatusEnum.completed) {
    return (
      <span className="rounded-full bg-[#3F2A38] px-5 py-1.5 capitalize text-[#EA5455]">
        {status}
      </span>
    );
  }

  if (status === DBEventStatusEnum.created) {
    return (
      <span className="rounded-full bg-[#2D3748] px-5 py-1.5 capitalize text-[#F6E05E]">
        {status}
      </span>
    );
  }

  return null;
};

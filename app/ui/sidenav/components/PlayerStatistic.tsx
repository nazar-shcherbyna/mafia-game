import {
  ArrowUpCircleIcon,
  DocumentCheckIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';
import { UiBox } from '../../atoms/box';

export const PlayerStatistic: React.FC = () => {
  return (
    <UiBox>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="text-[14px] leading-[21px]">
          <div className="mb-1 flex items-center gap-1">
            <PuzzlePieceIcon color="#746BD4" width={18} height={18} />
            <h6 className="">Games</h6>
          </div>
          <h6 className="text-center">0</h6>
        </div>
        <div className="text-[14px] leading-[21px]">
          <div className="mb-1 flex items-center gap-1">
            <ArrowUpCircleIcon color="#28C76F" width={18} height={18} />
            <h6 className="">Wins</h6>
          </div>
          <h6 className="text-center">0</h6>
        </div>
        <div className="text-[14px] leading-[21px]">
          <div className="mb-1 flex items-center gap-1">
            <DocumentCheckIcon color="#00CFE8" width={18} height={18} />
            <h6 className="">Average score</h6>
          </div>
          <h6 className="text-center">0</h6>
        </div>
      </div>
    </UiBox>
  );
};

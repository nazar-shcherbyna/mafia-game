import { UiButton } from '../atoms/button';
import { UiStatus } from '../atoms/status';

export const GamesTable: React.FC<{
  columns: string[];
  data: string[][];
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
            <th className="min-w-[100px] px-6 py-3.5 text-start">Type</th>
            <th className="px-6 py-3.5 text-start">Status</th>
            <th className="px-6 py-3.5 text-start">Players</th>
            <th className="px-6 py-3.5 text-start">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#1F2233]">
          <tr className="border-b-[1px] border-[#68709B]">
            <td className="px-6 py-3.5">Name 1</td>
            <td className="px-6 py-3.5 capitalize">classic</td>
            <td className="px-6 py-3.5">
              <UiStatus status="active" />
            </td>
            <td className="px-6 py-3.5">9/12</td>
            <td className="px-6 py-3.5">
              <UiButton className="rounded-md px-5 py-1.5 text-xs font-medium">
                View
              </UiButton>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-3.5">Name 2</td>
            <td className="px-6 py-3.5 capitalize">classic</td>
            <td className="px-6 py-3.5">
              <UiStatus status="inactive" />
            </td>
            <td className="px-6 py-3.5">9/12</td>
            <td className="px-6 py-3.5">
              <UiButton className="rounded-md px-5 py-1.5 text-xs font-medium">
                View
              </UiButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import { UiStatus } from './status';

export const UiTable: React.FC<{
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
        border-collapse
        divide-y-[1px]
        divide-[#68709B]
      `}
      >
        <thead>
          <tr>
            <th className="px-6 py-3.5">Game name</th>
            <th className="px-6 py-3.5">Type</th>
            <th className="px-6 py-3.5">Status</th>
            <th className="px-6 py-3.5">Players</th>
            <th className="px-6 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-3.5">Name 1</td>
            <td className="px-6 py-3.5">Type 1</td>
            <td className="px-6 py-3.5">
              <UiStatus status="active" />
            </td>
            <td className="px-6 py-3.5">Indianapolis</td>
            <td className="px-6 py-3.5">Indianapolis</td>
          </tr>
          <tr>
            <td className="px-6 py-3.5">Name 2</td>
            <td className="px-6 py-3.5">Type 2</td>
            <td className="px-6 py-3.5">
              <UiStatus status="inactive" />
            </td>
            <td className="px-6 py-3.5">Indianapolis</td>
            <td className="px-6 py-3.5">Indianapolis</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

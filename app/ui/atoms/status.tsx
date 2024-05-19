export const UiStatus: React.FC<{
  status: 'active' | 'inactive';
}> = ({ status }) => {
  if (status === 'active') {
    return (
      <span className="rounded-full bg-[#203C3D] px-5 py-1.5 capitalize text-[#28C76F]">
        {status}
      </span>
    );
  }

  if (status === 'inactive') {
    return (
      <span className="rounded-full bg-[#3F2A38] px-5 py-1.5 capitalize text-[#EA5455]">
        {status}
      </span>
    );
  }

  return null;
};

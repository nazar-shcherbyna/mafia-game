export const UiBox: React.FC<{
  children: NonNullable<React.ReactNode>;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`${className ? className : ''}
        rounded-xl
        border-[1px] border-[#68709B] 
        bg-[#393C51]
        p-5`}
    >
      {children}
    </div>
  );
};

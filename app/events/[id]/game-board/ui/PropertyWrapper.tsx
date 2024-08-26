export const PropertyWrapper: React.FC<{
  children: NonNullable<React.ReactNode>;
}> = ({ children }) => (
  <div className="flex w-full items-center justify-between gap-2">
    {children}
  </div>
);

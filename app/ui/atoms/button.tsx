import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function UiButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `text-white rounded-md bg-[#746BD4]
        p-2 text-sm font-medium transition-colors 
        hover:bg-[#ABA4F6] focus:bg-[#5C52C0] active:bg-[#5C52C0] 
        disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
    >
      {children}
    </button>
  );
}

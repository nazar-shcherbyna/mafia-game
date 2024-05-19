import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function UiButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `rounded-md bg-[#746BD4] p-2
        text-sm font-medium text-white transition-colors 
        hover:bg-[#ABA4F6] focus:bg-[#5C52C0] active:bg-[#5C52C0] 
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    >
      {children}
    </button>
  );
}

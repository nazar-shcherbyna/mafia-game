import clsx from "clsx";


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function UiSelect({ children, className, ...rest }: SelectProps) {
  return (
    <select
      {...rest}
      className={clsx(
        `rounded-md bg-[#746BD4] p-2 px-6
        text-sm font-medium text-white transition-colors 
        hover:bg-[#ABA4F6] focus:bg-[#5C52C0] active:bg-[#5C52C0] 
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    >{children}</select>
  )
}

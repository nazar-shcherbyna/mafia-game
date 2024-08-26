import clsx from "clsx";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

export function UiCheckbox({ className, ...rest }: Props) {
  return (
    <input type="checkbox"
      {...rest}
      className={clsx(
        `rounded-md bg-[#746BD4] p-2 px-6
        text-sm font-medium text-white transition-colors 
        hover:bg-[#ABA4F6] focus:bg-[#5C52C0] active:bg-[#5C52C0] 
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    />
  )
}

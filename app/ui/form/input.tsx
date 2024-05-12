import React from 'react';

export const UiFormInput: React.FC<{
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  type: React.HTMLInputTypeAttribute;
  className?: string;
}> = ({
  name,
  label,
  placeholder,
  icon,
  required,
  disabled,
  minLength,
  type,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          className="mb-1 block text-xs font-normal text-[#CFD3EC]"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className="block w-full 
            rounded-md border-[1px] border-[#68709B] bg-white p-2 pl-10 
            text-sm  text-[#425197] placeholder:text-[#D0D4E8]
            focus:border-[#28C76F]"
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          aria-disabled={disabled}
          minLength={minLength}
        />
        {icon}
      </div>
    </div>
  );
};

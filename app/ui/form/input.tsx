import { KeyIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const UiFormInput: React.FC<{
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  type: React.HTMLInputTypeAttribute;
  className?: string;
}> = ({
  name,
  label,
  placeholder,
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
          className="w-full 
            rounded-md border-[1px] border-[#68709B] bg-white px-3 py-2.5
            text-sm  text-[#425197] 
            outline-none
            ring-0
            placeholder:text-[#D0D4E8] focus:border-[#28C76F]
            focus:outline-none active:border-[#28C76F]
            active:outline-none"
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          aria-disabled={disabled}
          minLength={minLength}
        />
        {type === 'password' && (
          <KeyIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        )}
      </div>
    </div>
  );
};

import { EyeIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const UiFormInputPassword: React.FC<{
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  errorMessages?: string[];
}> = ({ name, placeholder, disabled, className, label, errorMessages }) => {
  const [inputType, setInputType] =
    React.useState<Extract<React.HTMLInputTypeAttribute, 'password' | 'text'>>(
      'password',
    );

  const handleChangeVisibility = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

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
          className="bg-white 
          w-full
            rounded-md border-[1px] border-[#68709B] px-3
            py-2.5 text-sm
            text-[#425197]  outline-none 
            ring-0
            placeholder:text-[#D0D4E8]
            focus:border-[#28C76F] focus:outline-none
            active:border-[#28C76F] active:outline-none"
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholder}
          aria-disabled={disabled}
        />
        <EyeIcon
          onClick={handleChangeVisibility}
          className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
        />
      </div>
      {errorMessages?.map((message) => (
        <p className="py-1 text-sm text-red-500" key={message}>
          {message}
        </p>
      ))}
    </div>
  );
};

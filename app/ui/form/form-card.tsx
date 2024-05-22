import React from 'react';

export const UiFormCard: React.FC<{
  label?: string;
  children: NonNullable<React.ReactNode>;
  action: (formData: FormData) => void;
  className?: string;
}> = ({ label, children, action, className }) => {
  return (
    <div
      className="${className} w-[320px] rounded-xl
        border-[1px] border-[#68709B] bg-[#393C51]
        p-6 
        sm:w-[440px]
        md:p-10
      "
    >
      {label && (
        <h4 className="mb-4 text-center text-2xl font-semibold leading-10">
          {label}
        </h4>
      )}
      <form action={action}>
        <div className="flex flex-col">{children}</div>
      </form>
    </div>
  );
};

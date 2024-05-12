import React from 'react';

export const UiFormCard: React.FC<{
  label?: string;
  children: NonNullable<React.ReactNode>;
  action: (formData: FormData) => void;
}> = ({ label, children, action }) => {
  return (
    <div
      className="
        w-[320px] rounded-xl border-[1px]
        border-[#68709B] bg-[#393C51] p-6 text-white
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

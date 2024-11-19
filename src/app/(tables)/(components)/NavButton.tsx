import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

function NavButton(
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  const { children, className = '', ...restButtonProps } = props;

  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-full ${className}`}
      {...restButtonProps}
    >
      {children}
    </button>
  );
}

export default NavButton;

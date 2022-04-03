import {
  DetailedHTMLProps,
  forwardRef,
  isValidElement,
  ReactNode,
  Ref,
} from 'react';

interface TextFieldProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | ReactNode;
  startAdornment?: ReactNode | string;
  id: string;
  error?: boolean | string;
  helperText?: string | JSX.Element | null;
}

function TextFieldForRef(props: TextFieldProps, ref: Ref<HTMLInputElement>) {
  const {
    id,
    label,
    error = false,
    helperText,
    startAdornment,
    ...inputProps
  } = props;

  const inputComponent = (
    <input
      ref={ref}
      id={id}
      type="text"
      {...inputProps}
      className={`h-[4.5rem] text-[length:inherit] placeholder:text-gray-300 ${
        !startAdornment
          ? `border-[0.1rem] rounded-primary px-7 focus:ring-2 focus:ring-offset-1 transition duration-200 ${
              error
                ? 'border-error-400 hover:border-error-500 focus:border-error-600 focus:ring-error-600'
                : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary disabled:bg-gray-200 disabled:text-gray-300 disabled:border-gray-200'
            }`
          : 'order-1 !border-0 !border-transparent !ring-0 !ring-transparent rounded-l-primary px-[1.55rem] peer flex-grow'
      } ${inputProps?.className ?? ''}`}
    />
  );

  return (
    <div className="flex flex-col text-[1.4rem] text-gray-600">
      <label htmlFor={id} className="items-start font-medium self-start mb-2">
        {label}
      </label>

      {!startAdornment ? (
        inputComponent
      ) : (
        <div className="relative flex">
          {typeof startAdornment === 'string' ? (
            <label
              htmlFor={id}
              className="bg-gray-100 border-r-[0.1rem] border-gray-200 text-gray-300 text-center px-7 flex flex-col items-start justify-center leading-none"
            >
              <span className="-mt-[0.16rem]">{startAdornment}</span>
            </label>
          ) : (
            startAdornment
          )}

          {inputComponent}

          <div
            className={`absolute top-0 left-0 bottom-0 right-0 pointer-events-none border-[0.1rem] rounded-primary peer-focus:ring-2 peer-focus:ring-offset-1 transition duration-200 ${
              error
                ? 'border-error-400 peer-hover:border-error-500 peer-focus:border-error-600 peer-focus:ring-error-600'
                : 'border-gray-200 peer-hover:border-gray-300 peer-focus:border-primary peer-focus:ring-primary peer-disabled:bg-gray-200 peer-disabled:text-gray-300 peer-disabled:border-gray-200'
            }`}
          />
        </div>
      )}

      {isValidElement(helperText) ? (
        helperText
      ) : typeof helperText === 'string' || typeof error === 'string' ? (
        <div
          className={`flex text-[1.3rem] mt-2 ${
            helperText ? 'text-current' : 'text-error-600'
          }`}
        >
          {!helperText && (
            <svg
              className="block fill-current mr-2 mt-1 w-[1.1em] h-[1.1em]"
              viewBox="0 0 16 16"
            >
              <path d="M7.99967 14.6663C4.31767 14.6663 1.33301 11.6817 1.33301 7.99967C1.33301 4.31767 4.31767 1.33301 7.99967 1.33301C11.6817 1.33301 14.6663 4.31767 14.6663 7.99967C14.6663 11.6817 11.6817 14.6663 7.99967 14.6663ZM7.33301 9.99967V11.333H8.66634V9.99967H7.33301ZM7.33301 4.66634V8.66634H8.66634V4.66634H7.33301Z" />
            </svg>
          )}
          {helperText ?? error}
        </div>
      ) : null}
    </div>
  );
}

export const TextField = forwardRef(TextFieldForRef);

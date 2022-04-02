import { DetailedHTMLProps, ReactNode } from 'react';

interface TextFieldProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | ReactNode;
  startAdornment?: ReactNode | string;
  id: string;
}

export function TextField(props: TextFieldProps) {
  const { id, label, startAdornment, ...inputProps } = props;

  const inputComponent = (
    <input
      id={id}
      type="text"
      {...inputProps}
      className={`h-[4.5rem] text-[length:inherit] placeholder:text-gray-300 ${
        !startAdornment
          ? 'border-[0.1rem] rounded-primary border-gray-200 px-7 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 transition duration-200'
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

          <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none border-[0.1rem] rounded-primary border-gray-200 peer-hover:border-gray-300 peer-focus:border-primary peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-1 transition duration-200" />
        </div>
      )}
    </div>
  );
}

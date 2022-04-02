import { ReactNode } from 'react';

interface StepperProps {
  steps: { value: string; label: ReactNode }[];
  currentValue: string;
}

export function Stepper(props: StepperProps) {
  const { steps, currentValue } = props;

  const currentStepIndex = steps.findIndex(st => st.value === currentValue);

  return (
    <div
      className={`w-[35rem] flex items-center justify-between relative`}
    >
      <div
        style={{
          backgroundSize: `${
            ((currentStepIndex * 2 + 1) / ((steps.length - 1) * 2)) * 100
          }% 100%`,
        }}
        className="w-[31rem] h-[0.1rem] absolute top-[1.95rem] left-8 transition-all duration-500 ease-in bg-gray-200 bg-gradient-to-r from-primary to-primary bg-no-repeat z-0"
      />

      {steps.map(function ({ value, label }, index) {
        const isStepComplete = index <= currentStepIndex;

        return (
          <div
            key={value}
            className={`flex relative z-10 items-center justify-center h-16 w-16 rounded-full transition duration-500 ease-in ${
              isStepComplete
                ? 'border-primary text-white bg-primary'
                : 'bg-white border border-gray-200 text-gray-500'
            }`}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

import { Button } from '../components/button';
import { Card } from '../components/card';
import { Typography } from '../components/typography';
import { planToUseEdenOptions } from '../constants/plan-to-use-eden-options';
import { useStepsContext } from '../hooks/use-steps-context';

export function PlanToUseEden() {
  const [_, setCurrentStep] = useStepsContext();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setCurrentStep('congratulations');
      }}
    >
      <fieldset name="plan" className="border-0 w-full">
        <legend className="sr-only">Please select an option</legend>

        <ul className="flex justify-between">
          {planToUseEdenOptions.map(function (
            { icon, heading, text, value },
            index,
          ) {
            return (
              <li key={value} className="basis-[calc(50%-1.5rem)]">
                <input
                  type="radio"
                  name="plan"
                  id={value}
                  value={value}
                  defaultChecked={index === 0}
                  className="sr-only peer"
                />
                <Card
                  tag="label"
                  htmlFor={value}
                  className="flex flex-col h-full cursor-pointer select-none text-gray-600 peer-checked:border-primary peer-checked:cursor-auto peer-checked:text-primary peer-checked:-mt-px peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1"
                >
                  <div className="flex justify-start mb-12 pl-2">{icon}</div>
                  <Typography variant="secondary-heading" className="mb-6">
                    {heading}
                  </Typography>
                  <Typography variant="secondary-sub-text">{text}</Typography>
                </Card>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <Button className="w-full mt-10">Create Workspace</Button>
    </form>
  );
}

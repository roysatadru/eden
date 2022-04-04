import { useReducer } from 'react';

interface UseCacheValidationsProps<T> {
  initialCachedValidationsState: {
    [key: string]: {
      fetching: boolean;
      results: T;
    };
  };
}

type CachedValidationsActions<T> =
  | {
      type: 'set-result';
      key: string;
      result: T;
    }
  | {
      type: 'start-fetching';
      key: string;
    }
  | {
      type: 'stop-fetching';
      key: string;
    };

function cachedValidationsReducer<T>(
  state: UseCacheValidationsProps<T>['initialCachedValidationsState'],
  action: CachedValidationsActions<T>,
): UseCacheValidationsProps<T>['initialCachedValidationsState'] {
  switch (action.type) {
    case 'set-result': {
      const { key, result } = action;

      return {
        ...state,
        [key]: {
          fetching: false,
          results: result,
        },
      };
    }

    case 'start-fetching': {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...(state[key] ?? {}),
          fetching: true,
        },
      };
    }

    case 'stop-fetching': {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...(state[key] ?? {}),
          fetching: false,
        },
      };
    }

    default:
      return state;
  }
}

export function useCacheValidations<T>(props: UseCacheValidationsProps<T>) {
  const { initialCachedValidationsState } = props;

  const [cachedValidations, dispatchCachedValidations] = useReducer(
    cachedValidationsReducer,
    initialCachedValidationsState,
  );

  return {
    cachedValidations:
      cachedValidations as typeof initialCachedValidationsState,
    dispatchCachedValidations,
  };
}

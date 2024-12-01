export interface QueryOptions {
  staleTime: number;
  extractError?: <T extends Error>(e: T) => any;
  retry?: number;
  retryDelay?: number;
}

export interface MutationOptions {
  extractError?: <T extends Error>(e: T) => any;
  retry?: number;
  retryDelay?: number;
}

export type Key = (string | number | boolean | bigint)[];

export interface QueryRecord {
  isLoading: boolean;
  isFetching: boolean;
  isLoaded: boolean;
  isError: boolean;
  isValid: boolean;
  isReset: boolean;
  timestamp: number | undefined;
  data: unknown | null;
  error: unknown | null;
}

export interface MutationRecord {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: unknown | null;
  error: unknown | null;
}

type State = Record<string, QueryRecord | MutationRecord>;

interface Modules {
  reducer: (
    state: State,
    action: {
      type: string;
      payload: Record<string, unknown>;
    },
  ) => State;

  selector: (
    key: Key,
  ) => (state: State) => QueryRecord | MutationRecord;

  query: <T extends unknown>(args: {
    key: Key;
    fn: () => Promise<T> | T;
    options?: Partial<QueryOptions>;
  }) => Generator<T, T, unknown>;

  mutation: <T extends unknown>(args: {
    key: Key;
    fn: () => Promise<T> | T;
    options?: Partial<MutationOptions>;
  }) => Generator<T, T, unknown>;

  invalidate: (key: Key) => void;

  reset: (key: Key) => void;
}

declare function initSagaQuery(args: {
  domain: string;
  extractError?: <T extends Error>(error: T) => any;
  retry?: number;
  retryDelay?: number;
  query: QueryOptions;
  mutation?: MutationOptions;
  createInstanceId?: () => string;
}): Modules;

export { initSagaQuery };

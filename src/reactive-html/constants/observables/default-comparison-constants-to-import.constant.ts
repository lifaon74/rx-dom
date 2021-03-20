import {
  reactiveEqual, reactiveGreaterThan, reactiveGreaterThanOrEqual, reactiveLowerThan, reactiveLowerThanOrEqual,
  reactiveNotEqual
} from '@lifaon/rx-js-light';

export const DEFAULT_COMPARISON_CONSTANTS_TO_IMPORT = {
  eq: reactiveEqual,
  neq: reactiveNotEqual,
  gt: reactiveGreaterThan,
  gte: reactiveGreaterThanOrEqual,
  lt: reactiveLowerThan,
  lte: reactiveLowerThanOrEqual,
};




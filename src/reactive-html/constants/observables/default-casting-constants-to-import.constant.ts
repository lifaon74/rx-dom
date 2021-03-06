import { mapToNumberSubscribePipe, mapToStringSubscribePipe } from '@lifaon/rx-js-light';

export const DEFAULT_CASTING_CONSTANTS_TO_IMPORT = {
  toNumber: mapToNumberSubscribePipe(),
  toString: mapToStringSubscribePipe(),
};




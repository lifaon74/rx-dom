import { distinctSubscribePipe, filterSubscribePipe, mapSubscribePipe, pipeSubscribeFunction } from '@lifaon/rx-js-light';

export const DEFAULT_PIPE_CONSTANTS_TO_IMPORT = {
  pipe: pipeSubscribeFunction,
  map: mapSubscribePipe,
  filter: filterSubscribePipe,
  distinct: distinctSubscribePipe,
};




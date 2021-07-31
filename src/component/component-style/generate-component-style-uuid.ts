import { createIncrementalUUID } from '../../misc/uuid/incremental-uuid';

const INCREMENTAL_STYLE_UUID = createIncrementalUUID('style');

export function generateComponentStyleUUID(): string {
  return INCREMENTAL_STYLE_UUID();
}


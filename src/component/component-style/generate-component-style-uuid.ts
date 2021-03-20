import { incrementalUUID } from '../../misc/uuid/incremental-uuid';

export function generateComponentStyleUUID(): string {
  return incrementalUUID('style');
}



let IS_PATCHING: boolean = false;

export function isPatching(): boolean {
  return IS_PATCHING;
}

export function startPatching(): void {
  IS_PATCHING = true;
}

export function endPatching(): void {
  IS_PATCHING = false;
}

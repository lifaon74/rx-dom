
// export type HTMLElementConstructor = typeof HTMLElement;
export interface HTMLElementConstructor {
  new(...args: any[]): HTMLElement;
}


/**
 * Called immediately when a new Component is created,
 *  - INFO: use it to return the data to inject into your template
 *  - INFO: perfect time to setup all your template's variables, and component's properties
 *  - WARN: doesnt guaranty that the component is actually into the DOM !
 */
export interface OnCreate<GData extends object> {
  onCreate(): GData;
}

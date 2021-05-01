
// Constructible stylesheets => https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/

export type IComponentStyle = HTMLStyleElement;

export type IComponentStyleAsync = IComponentStyle | Promise<IComponentStyle>;


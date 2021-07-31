
const HOST_SELECTOR = ':host';
const HOST_CONTEXT_SELECTOR = ':host-context';

/*

:host(:not(.visible).k).p {
  display: none;
}


:host-context(main) {
  font-size: 15px;
}


 */

export function compileCSSStyleRuleForComponent(
  rule: CSSStyleRule,
  componentId: string,
): void {
  // https://blog.angular-university.io/angular-host-context/
  // https://developer.mozilla.org/en-US/docs/Web/CSS/:host-context()

  const selector: string = rule.selectorText;
  let newSelector: string = '';
  let position: number = 0;
  while (position < selector.length) {

    const index: number = selector.indexOf(HOST_CONTEXT_SELECTOR, position);
    if (index === -1) {
      const index: number = selector.indexOf(HOST_SELECTOR, position);
      if (index === -1) {
        newSelector += selector.slice(position);
        position = selector.length;
      } else {
        const selectorBefore: string = selector.slice(position, index);
        const selectorHost: string = `[${ componentId }]`;
        let selectorHostSelf: string;

        position = index + HOST_SELECTOR.length;

        if (selector.startsWith('(', position)) {
          const i: number = extractParenthesisContent(selector, position);
          selectorHostSelf = selector.slice(position + 1, i - 1);
          position = i;
        } else {
          selectorHostSelf = '';
        }

        newSelector += `${ selectorBefore }${ selectorHost }${ selectorHostSelf }`;
      }
    } else {
      const selectorBefore: string = selector.slice(position, index);
      const selectorHost: string = `[${ componentId }]`;
      let selectorHostContext: string;

      position = index + HOST_CONTEXT_SELECTOR.length;

      if (selector.startsWith('(', position)) {
        const i: number = extractParenthesisContent(selector, position);
        selectorHostContext = `${ selector.slice(position + 1, i - 1) } `;
        position = i;
      } else {
        selectorHostContext = '';
      }

      newSelector += `${ selectorBefore }${ selectorHostContext }${ selectorHost }`;
    }
  }

  rule.selectorText = newSelector;

  // rule.selectorText = rule.selectorText
  //   .replace(/:host/g, `[${ componentId }]`)
  //   // .replace(/:host/g, (substring: string, ...args: any[]): string =>{
  //   //
  //   // })
  // ;
}

// export function compileCSSStyleRuleForComponent(
//   rule: CSSStyleRule,
//   componentId: string,
// ): void {
//   // https://blog.angular-university.io/angular-host-context/
//   // TODO improve to support host() and host-context()
//
//   const selector: string = rule.selectorText;
//   let newSelector: string = '';
//   let position: number = 0;
//   while (position < selector.length) {
//
//     // {
//     //   const index: number = selector.indexOf(HOST_CONTEXT_SELECTOR);
//     //   if (index === -1) {
//     //     newSelector += selector;
//     //     break;
//     //   } else {
//     //     newSelector += selector.slice(0, index);
//     //     selector = selector.slice(index + HOST_SELECTOR.length);
//     //     newSelector += `[${ componentId }]`;
//     //     if (selector.startsWith('(')) {
//     //       const i: number = extractParenthesisContent(selector);
//     //       newSelector += selector.slice(1, i - 1);
//     //       selector = selector.slice(i);
//     //     }
//     //   }
//     // }
//
//     {
//       const index: number = selector.indexOf(HOST_SELECTOR);
//       if (index === -1) {
//         newSelector += selector;
//         break;
//       } else {
//         newSelector += selector.slice(0, index);
//         selector = selector.slice(index + HOST_SELECTOR.length);
//         newSelector += `[${ componentId }]`;
//         if (selector.startsWith('(')) {
//           const i: number = extractParenthesisContent(selector);
//           newSelector += selector.slice(1, i - 1);
//           selector = selector.slice(i);
//         }
//       }
//     }
//
//   }
//
//   console.log(rule.selectorText, newSelector);
//
//   // rule.selectorText = newSelector;
//   // rule.selectorText = rule.selectorText
//   //   .replace(/:host/g, `[${ componentId }]`)
//   //   // .replace(/:host/g, (substring: string, ...args: any[]): string =>{
//   //   //
//   //   // })
//   // ;
// }

function extractParenthesisContent(
  input: string,
  position: number = 0,
): number {
  let count: number = 1;
  let i: number = position + 1;
  let j: number = 1000;

  while (count > 0 && (j-- > 0)) {
    const a: number = input.indexOf(')', i);
    const b: number = input.indexOf('(', i);

    if (a === -1) {
      throw new Error(`Missing closing parenthesis`);
    }

    if ((a < b) || (b === -1)) {
      count--;
      i = a + 1;
    } else {
      count++;
      i = b + 1;
    }
  }

  if (j <= 0) {
    throw new Error(`Too much parenthesis nesting`);
  }

  return i;
}

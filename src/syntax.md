# Reactive HTML syntax

## Text: {{ observable }}

```html
{{ observable }}
```

Creates a Text Node whose content is updated by a SubscribeFunction (`string`).

It compiles to something similar to this:

```ts
observable((value) => text.value = value);
```

---

## Attributes

### Bind: []

#### Bind property: \[property\]

```html
<input
  [value]="observable"
/>
```

Links the property of an Element with a SubscribeFunction (`any`): when the SubscribeFunction changes, the property is
updated with the received value.

It compiles to something similar to this:

```ts
observable((value) => input.value = value);
```

##### alternative syntax

```html
<input
  bind-value="observable"
/>
```

#### Bind class: \[class.class-name\]

```html
<div
  [class.my-class]="observable"
></div>
```

Links the classList of an Element with a SubscribeFunction (`boolean`): when the SubscribeFunction changes, the class is
toggled (present only when `true` is received).

It compiles to something similar to this:

```ts
observable((value) => div.classList.toggle('my-class', value));
```

##### alternative syntax

```html
<input
  bind-class-my-class="observable"
/>
```

#### Bind class list: \[class...\]

```html
<div
  [class...]="observable"
></div>
```

Links the className of an Element with a SubscribeFunction (`Set<string>`): when the SubscribeFunction changes, the
classes are added or removed from the Element.

It compiles to something similar to this:

```ts
observable((classes) => div.className = classes);
```

##### alternative syntax

```html
<div
  bind-class---="observable"
></div>
```

#### Bind style: \[style.style-property\]

```html
<div
  [style.font-size]="observable"
></div>
```

Links a style property of an Element with a SubscribeFunction (`string | number | null`):

If `null` is received, the property is removed. If a `string | number` is received, the property is converted to string
and set.

It compiles to something similar to this:

```ts
observable((value) => div.style.setProperty('font-size', value));
```

[comment]: <> (**ℹ️ INFO:** you can specify a unit using:)

[comment]: <> (```html)

[comment]: <> (<div)

[comment]: <> (  [style.font-size.px]="observable")

[comment]: <> (></div>)

[comment]: <> (```)

##### alternative syntax

```html
<input
  bind-style-font-size="observable"
/>
```

#### Bind style list: \[style...\]

```html
<div
  [style...]="observable"
></div>
```

Links the style attribute of an Element with a SubscribeFunction (`Map<string, string>`): when the SubscribeFunction
changes, the Element's style is updated.

It compiles to something similar to this:

```ts
observable((styles) => div.setAttribute('style', styles));
```

##### alternative syntax

```html
<div
  bind-style---="observable"
></div>
```

#### Bind attribute: \[attr.name\]

```html
<div
  [attr.aria-label]="observable"
></div>
```

Links an attribute of an Element with a SubscribeFunction (`string | null`):

If `null` is received, the attribute is removed. If a `string` is received, the attribute is set to this value.

It compiles to something similar to this:

```ts
observable((value) => div.setAttribute('aria-label', value));
```

##### alternative syntax

```html
<input
  bind-attr-aria-label="observable"
/>
```

---

### EventListener: (event-name)

```html
<div
  (click)="observer"
></div>
```

Creates an *eventsListener* on an Element and output its content into an Observer (`Event`):

It compiles to something similar to this:

```ts
div.addEventListener('click', observer);
```

##### alternative syntax

```html
<div
  on-click="observer"
></div>
```

---

### Reference: #reference-name (EXPERIMENTAL)

```html
<div
  #my-div
></div>
```

Creates a reference on an Element.

It compiles to something similar to this:

```ts
setNodeReference('my-div', div);
```

**ℹ️ INFO:** you can retrieve a reference to a Node with `getNodeReference('my-div')`.

**ℹ️ INFO:** you may set a value to this ref attribute. In this case, the value will be used as the reference's name:

```html
<div
  #ref="my-div"
></div>
```

##### alternative syntax

```html
<div
  ref-my-div
></div>
```

---

### Node Modifier: $modifier-name

```html
<div
  $modifier-name="[...args]"
></div>
```

Creates a [modifier]((../examples/node-modifiers.md)) on an Element.

It compiles to something similar to this:

```ts
const newNode = getNodeModifier('modifier-name')(node, ...args);
```

##### alternative syntax

```html
<div
  mod-modifier-name="[...args]"
></div>
```

[more details here](../examples/node-modifiers.md)

---

## Elements

### Template: rx-template

```html
<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>
```

Creates a reusable template.

Attributes:

- `name`: the name of the template
- `let-XXX`: declare a variable for this template

It compiles to something similar to this:

```ts
setTemplateReference(
  'templateReference',
  ({ var1, var2 }): DocumentFragment => content,
);
```

**ℹ️ INFO:**️ You can retrieve a reference to a Template with `getTemplateReference('templateReference')`.

**⚠️️ WARNING:** html attribute's names are case-insensitive, so the `let` properties are converted from `dash-case`
to `camelCase`. Example: `let-my-var="myNewVar"` => `{ myVar: myNewVar }`

### Template injection: rx-inject-template

```html
<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>
```

Injects a template into the DOM.

Attributes:

- `template`: the name of the template to inject
- `let-XXX`: the variables to provide to this template

It compiles to something similar to this:

```ts
attachTemplate(
  getTemplateReference('templateReference'),
  { var1: data1, var2: data2 },
  parentNode,
);
``` 

### Dynamic content injection: rx-inject-content

```html
<rx-inject-content 
  content="observable"
></rx-inject-content>
```

Injects dynamically a DocumentFragment into the DOM. Previously inserted nodes are removed.

Attributes:

- `content`: the SubscribeFunction which emits a DocumentFragment or null

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveContentNode(observable));
``` 

### Conditional boolean template injection: rx-if or *if

```html
<rx-if
  condition="conditionObservable"
  true="templateReferenceTrue"
  false="templateReferenceFalse"
></rx-if>
```

Creates a virtual Node which:

- subscribes to `conditionObservable`
- and injects `templateReferenceTrue` if it received *true*
- or injects `templateReferenceFalse` if it received *false*

**ℹ️ INFO:** the previously injected template is removed.

Attributes:

- `condition`: the SubscribeFunction to listen to
- `true`: the name of the template to inject if `condition` emitted *true*
- `false`: the name of the template to inject if `condition` emitted *false*

**ℹ️ INFO:** you may omit one of the template.

It compiles to something similar to this:

```ts
nodeAppendChild(
  parentNode,
  createReactiveIfNode(
    conditionObservable,
    getTemplateReference('templateReferenceTrue'),
    getTemplateReference('templateReferenceFalse'),
  )
);
```

##### alternative syntax

```html
<tag-mame
  *if="conditionObservable"
  ...otherAttributes
>
  ...content
</tag-mame>
```

Which is equivalent to:

```html

<rx-template
  name="uuid"
>
  <tag-mame
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>
```

### Conditional switch template injection: rx-switch

```html
<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="templateReferenceA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="templateReferenceB"
  ></rx-switch-case>
  <rx-switch-default
    template="templateReferenceC"
  ></rx-switch-default>
</rx-switch>
```

Creates a virtual Node which:

- subscribes to `observable`
- and injects `templateReferenceA`, `templateReferenceB` or `templateReferenceC` according to the received value

**ℹ️ INFO:** the previous injected template is removed.

Attributes:

- rx-switch
  - `expression`: the SubscribeFunction to listen to
- rx-switch-case
  - `case`: the value for this template
  - `template`: the template reference to inject
- rx-switch-default
  - `template`: the template reference to inject

**ℹ️ INFO:** you may omit `rx-switch-default`.

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveSwitchNode(observable, new Map([
  [valueA, getTemplateReference('templateReferenceA')],
  [valueB, getTemplateReference('templateReferenceB')],
]), templateReferenceC));
```

##### alternative syntax

```html
<rx-switch
  expression="observable"
>
  <tag-name-a
    *switch-case="valueA"
    ...otherAttributesA
  >
    ...contentA
  </tag-name-a>
  <tag-name-b
    *switch-case="valueB"
    ...otherAttributesB
  >
    ...contentB
  </tag-name-b>
  <tag-name-c
    *switch-default
    ...otherAttributesC
  >
    ...contentC
  </tag-name-c>
</rx-switch>
```

Which is equivalent to:

```html
<rx-template
  name="uuidA"
>
  <tag-mame-a
    ...otherAttributesA
  >
    ...contentA
  </tag-mame-a>
</rx-template>

<rx-template
    name="uuidB"
>
  <tag-mame-b
    ...otherAttributesB
  >
    ...contentB
  </tag-mame-b>
</rx-template>

<rx-template
  name="uuidC"
>
  <tag-mame-c
    ...otherAttributesC
  >
    ...contentC
  </tag-mame-c>
</rx-template>

<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="uuidA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="uuidB"
  ></rx-switch-case>
  <rx-switch-default
    template="uuidC"
  ></rx-switch-default>
</rx-switch>
```

### For loop template injection: rx-for-loop or *for

```html
<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>
```

Creates a virtual Node which:

- subscribes to `itemsObservable`
- and injects the template `templateReference` for each received values

**ℹ️ INFO:** the virtual Node take care to optimize the DOM and the rendering process (re-use nodes if possible).

Attributes:

- `items`: the SubscribeFunction to listen to
- `template`: the name of the template to inject for each values
- `track-by` (optional): a trackByFunction to known which nodes may be re-used

It compiles to something similar to this:

```ts
nodeAppendChild(
  parentNode,
  createReactiveForLoopNode(
    itemsObservable,
    getTemplateReference('templateReference'),
    { tackBy: trackByFunction },
  ),
);
```

##### alternative syntax

```html
<tag-name
  *for="let item of items; index as i; trackBy: trackByFn"
  ...otherAttributes
>
  ...content
</tag-name>
```

Which is equivalent to:

```html

<rx-template
  name="uuid"
  let-index="i"
>
  <tag-mame
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>
```

### Virtual container: rx-container

```html
<rx-container>
  ...content
</rx-container>
```

Creates a virtual node to wrap other nodes.

It only accepts `*command` attributes.

*Example:*

```html
List of names:
<rx-container
  *for="let item of of('Alice', 'Bob', 'Carol')"
>
  {{ of(item) }},
</rx-container>
```

Results in:

```html
List of names: Alice, Bob, Carol
```

**NOTE:** as you may see there's no element around the text nodes.

### Inject some javascript: rx-script

```html
<rx-script>
  ...js code
</rx-script>
```

Injects some javascript code into the compiled javascript output

*Example:*

```html
<rx-script>
  const isLoading$ = map$$($.state$, state => (state === 'loading'));
</rx-script>
```

It compiles directly to this:

```ts
const isLoading$ = map$$($.state$, state => (state === 'loading'));
```

The DOM is untouched.

**NOTE:** when possible, always prefer to write your javascript code into your component's `typescript file` instead of
using `rx-script`

##### alternative syntax

```html
<script rx>
  ...js code
</script>
```


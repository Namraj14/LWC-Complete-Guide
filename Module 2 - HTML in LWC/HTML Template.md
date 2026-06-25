# 04 - HTML Templates in Lightning Web Components (LWC)

> Learn how HTML Templates work in Lightning Web Components. This lesson covers template syntax, data binding, expressions, Lightning Base Components, directives overview, and best practices for building clean and reusable user interfaces.

---

# Table of Contents

- What is an HTML Template?
- Why Templates are Used
- Template Structure
- Template Rules
- Displaying Data
- Data Binding
- Calling Methods
- Using JavaScript Expressions
- Nesting Components
- Lightning Base Components
- Comments in Templates
- Common Mistakes
- Best Practices
- Interview Questions
- Key Takeaways

---

# Introduction

Every Lightning Web Component must have an HTML file.

The HTML file defines **what users see** on the screen.

It contains:

- UI Structure
- Lightning Base Components
- Data Binding
- Child Components
- Template Directives
- Event Bindings

Think of the HTML template as the **View** of your component.

---

# What is an HTML Template?

An HTML Template is a file that defines the visual structure of a Lightning Web Component.

Every LWC HTML file begins with the `<template>` tag.

Example

```html
<template>

    <h1>Hello World</h1>

</template>
```

Unlike normal HTML pages, LWC templates **do not contain**:

- `<html>`
- `<head>`
- `<body>`

Salesforce automatically creates those elements.

---

# Why Templates are Used

Templates separate the UI from business logic.

```
HTML

↓

Displays Data

JavaScript

↓

Processes Data
```

This separation makes applications easier to:

- Read
- Maintain
- Debug
- Reuse

---

# Basic Template Structure

Example

```html
<template>

    <lightning-card title="Account">

        <p>Hello User</p>

    </lightning-card>

</template>
```

Here,

- `<template>` is the root element.
- `<lightning-card>` is a Salesforce Lightning Base Component.
- `<p>` displays text.

---

# Rules of an HTML Template

Every LWC template must follow these rules.

### Rule 1

Only **one root `<template>` tag** is allowed.

✅ Correct

```html
<template>

    <h1>Hello</h1>

</template>
```

❌ Incorrect

```html
<template></template>

<template></template>
```

---

### Rule 2

HTML must be properly closed.

✅ Correct

```html
<p>Hello</p>
```

❌ Incorrect

```html
<p>Hello
```

---

### Rule 3

Use lowercase HTML tags.

✅

```html
<div>
```

❌

```html
<DIV>
```

---

### Rule 4

Do not write JavaScript inside HTML.

❌ Incorrect

```html
<template>

    <p>{5 + 10}</p>

</template>
```

Expressions are not allowed.

Do calculations inside JavaScript.

---

# Displaying Static Data

Example

```html
<template>

    <h1>Welcome to LWC</h1>

    <p>Learning HTML Templates</p>

</template>
```

This displays fixed content.

---

# Displaying Dynamic Data

Dynamic data comes from the JavaScript file.

JavaScript

```javascript
import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    name = 'John';

}
```

HTML

```html
<template>

    <h1>Hello {name}</h1>

</template>
```

Output

```
Hello John
```

The value inside `{}` comes from the JavaScript class.

---

# Data Binding

LWC uses **one-way data binding**.

```
JavaScript

↓

HTML
```

Whenever the JavaScript value changes,

the UI updates automatically.

Example

JavaScript

```javascript
message = 'Welcome';
```

HTML

```html
<p>{message}</p>
```

Output

```
Welcome
```

If JavaScript changes

```javascript
this.message = 'Hello';
```

Output automatically becomes

```
Hello
```

---

# Displaying Multiple Variables

JavaScript

```javascript
firstName = 'John';

lastName = 'Doe';
```

HTML

```html
<template>

    <p>{firstName}</p>

    <p>{lastName}</p>

</template>
```

Output

```
John

Doe
```

---

# Calling Getter Methods

Templates cannot call normal JavaScript methods with parentheses.

❌ Incorrect

```html
<p>{getName()}</p>
```

Instead, use **getters**.

JavaScript

```javascript
get fullName() {

    return 'John Doe';

}
```

HTML

```html
<p>{fullName}</p>
```

Output

```
John Doe
```

---

# Can We Write JavaScript Expressions?

No.

The template supports only:

- Properties
- Getters

❌ Invalid

```html
<p>{age + 5}</p>
```

❌ Invalid

```html
<p>{name.toUpperCase()}</p>
```

❌ Invalid

```html
<p>{isActive ? 'Yes' : 'No'}</p>
```

Instead,

JavaScript

```javascript
get userAge() {

    return this.age + 5;

}
```

HTML

```html
<p>{userAge}</p>
```

---

# Using HTML Attributes

Values can also be bound inside attributes.

JavaScript

```javascript
label = 'Save';
```

HTML

```html
<lightning-button

    label={label}

></lightning-button>
```

Output

```
Button

Save
```

---

# Nesting Components

One LWC can contain another LWC.

Parent

```html
<template>

    <c-child-component></c-child-component>

</template>
```

The child component becomes part of the parent's UI.

---

# Lightning Base Components

Salesforce provides ready-made components.

Examples

```
lightning-button

lightning-card

lightning-input

lightning-datatable

lightning-combobox

lightning-record-form

lightning-spinner
```

Example

```html
<template>

    <lightning-button

        label="Save"

    ></lightning-button>

</template>
```

Using Lightning Base Components ensures:

- Salesforce styling
- Accessibility
- Responsive design
- Built-in functionality

---

# Comments in Templates

HTML comments are supported.

Example

```html
<!-- Account Details -->
```

These comments are ignored by the browser.

---

# Common Mistakes

### Missing Template Tag

❌

```html
<h1>Hello</h1>
```

Always wrap HTML inside

```html
<template>
```

---

### Calling Functions

❌

```html
<p>{calculate()}</p>
```

Use getters instead.

---

### JavaScript Expressions

❌

```html
<p>{10 + 20}</p>
```

Move calculations to JavaScript.

---

### Accessing Undefined Variables

JavaScript

```javascript
name = 'John';
```

HTML

❌

```html
<p>{fullName}</p>
```

If `fullName` does not exist,

nothing will be displayed.

---

# Best Practices

✅ Keep HTML clean.

✅ Move business logic to JavaScript.

✅ Use getters for computed values.

✅ Use Lightning Base Components whenever possible.

✅ Break large templates into smaller reusable components.

✅ Use meaningful class names and indentation.

---

# Interview Questions

## What is an HTML Template in LWC?

An HTML Template defines the user interface of a Lightning Web Component.

---

## What is the root tag of every LWC HTML file?

```
<template>
```

---

## Can we write JavaScript inside an HTML template?

No.

Templates support only property references and getters.

---

## Can we call JavaScript methods inside HTML?

No.

Instead, use getters.

---

## What type of data binding does LWC use?

LWC uses **one-way data binding**, where data flows from JavaScript to the HTML template.

---

## Can one LWC contain another LWC?

Yes.

Components can be nested using custom component tags.

Example

```html
<c-account-card></c-account-card>
```

---

## Why should we use Lightning Base Components?

Because they provide:

- Consistent Salesforce UI
- Accessibility
- Responsive design
- Built-in functionality
- Less custom code

---

# Key Takeaways

- Every LWC requires an HTML template.
- The `<template>` tag is the root element of every component.
- HTML templates define the component's UI.
- Dynamic values are displayed using `{property}` syntax.
- LWC supports **one-way data binding**.
- JavaScript expressions are **not allowed** inside templates.
- Use getters for computed values.
- Lightning Base Components help build consistent Salesforce interfaces.
- Keep business logic in JavaScript and presentation logic in HTML.

---


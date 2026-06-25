# 03 - Rendering Lifecycle, Folder Structure & How Salesforce Loads an LWC

> Learn how Salesforce loads a Lightning Web Component, understand the standard LWC folder structure, and explore the complete rendering lifecycle from component creation to rendering.

---

# Table of Contents

- Introduction
- LWC Folder Structure
- Understanding Each File
- Component Naming Rules
- How Salesforce Loads an LWC
- LWC Rendering Lifecycle
- Complete Lifecycle Flow
- Lifecycle Hooks
- Rendering vs Re-rendering
- Best Practices
- Interview Questions
- Key Takeaways

---

# Introduction

When you create your first Lightning Web Component, Salesforce automatically generates a set of files.

Many beginners know these files exist but don't understand:

- Why each file exists
- Which file executes first
- How Salesforce loads the component
- What happens before the component appears on the screen

Understanding this process makes debugging and development much easier.

---

# LWC Folder Structure

Every Lightning Web Component is stored inside the **lwc** folder.

Example:

```
force-app
│
└── main
    │
    └── default
        │
        └── lwc
            │
            ├── accountCard
            │      ├── accountCard.html
            │      ├── accountCard.js
            │      ├── accountCard.css
            │      └── accountCard.js-meta.xml
            │
            └── contactCard
                   ├── contactCard.html
                   ├── contactCard.js
                   ├── contactCard.css
                   └── contactCard.js-meta.xml
```

Each component gets its own folder.

The folder name becomes the component's name.

---

# Files Inside an LWC Component

A typical Lightning Web Component contains four files.

```
accountCard
│
├── accountCard.html
├── accountCard.js
├── accountCard.css
└── accountCard.js-meta.xml
```

---

# 1. HTML File

```
accountCard.html
```

Purpose:

- Defines the UI
- Displays data
- Contains Lightning Base Components
- Uses template directives

Example

```html
<template>

    <lightning-card title="Account">

        <p>Hello World</p>

    </lightning-card>

</template>
```

Think of it as the **View** of the component.

---

# 2. JavaScript File

```
accountCard.js
```

Purpose:

- Business logic
- Event handling
- Variables
- API calls
- Wire adapters
- Lifecycle hooks

Example

```javascript
import { LightningElement } from 'lwc';

export default class AccountCard extends LightningElement {

    message = 'Hello';

}
```

Think of it as the **Brain** of the component.

---

# 3. CSS File

```
accountCard.css
```

Purpose:

- Component styling
- Layout
- Colors
- Fonts
- Responsive design

Example

```css
p{

    color:blue;

}
```

The styles apply only to this component because of Shadow DOM.

---

# 4. Metadata File

```
accountCard.js-meta.xml
```

Purpose:

- Makes the component available to Salesforce.
- Defines where the component can be used.
- Specifies the API version.
- Declares component capabilities.

Example

```xml
<?xml version="1.0" encoding="UTF-8"?>

<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">

    <apiVersion>64.0</apiVersion>

    <isExposed>true</isExposed>

    <targets>

        <target>lightning__AppPage</target>

        <target>lightning__HomePage</target>

        <target>lightning__RecordPage</target>

    </targets>

</LightningComponentBundle>
```

Without this file, Salesforce does not know where your component can be used.

---

# Optional Files

Depending on the requirement, you may also have:

```
component.svg
```

Used for a custom icon in App Builder.

---

```
__tests__
```

Used for Jest unit testing.

---

# Component Naming Rules

Component names must follow Salesforce naming conventions.

✅ Valid

```
accountCard

customerList

employeeDetails
```

❌ Invalid

```
AccountCard
```

(Cannot start with an uppercase letter.)

---

```
account-card
```

(Hyphens are not allowed in folder names.)

---

```
123Account
```

(Cannot start with a number.)

---

General rules:

- Start with a lowercase letter.
- Use camelCase.
- No spaces.
- No special characters.
- Folder name, HTML file, JS file, CSS file, and metadata file must have the same name.

---

# How Salesforce Loads an LWC

Suppose you drag an LWC onto a Lightning Record Page.

```
Account Record Page

↓

AccountCard Component
```

When the page loads, Salesforce performs several steps.

---

## Step 1 — Read Metadata

Salesforce first reads:

```
accountCard.js-meta.xml
```

It checks:

- Is the component exposed?
- Can it be used on this page?
- Which API version should be used?

If the answers are valid, Salesforce proceeds.

---

## Step 2 — Download Component Resources

Salesforce downloads:

```
HTML

CSS

JavaScript
```

---

## Step 3 — Create Component Instance

Salesforce creates an instance of your component.

Think of this like creating an object from a class.

```
AccountCard

↓

new AccountCard()
```

---

## Step 4 — Execute JavaScript

JavaScript initializes:

- Variables
- Imports
- Wire adapters
- Getters
- Setters

Example

```javascript
message = 'Welcome';
```

The variable now exists in memory.

---

## Step 5 — Lifecycle Begins

The first lifecycle hook runs.

```
constructor()
```

---

## Step 6 — Connect Component

Salesforce inserts the component into the page.

Now

```
connectedCallback()
```

executes.

---

## Step 7 — Render HTML

The HTML template is processed.

Expressions like

```html
{message}
```

are evaluated.

---

## Step 8 — Browser Creates Shadow DOM

The component receives its own Shadow DOM.

The browser now knows what should appear on the screen.

---

## Step 9 — Render Complete

After rendering finishes,

```
renderedCallback()
```

runs.

The component is now visible to the user.

---

# Complete Loading Flow

```
User Opens Page

↓

Salesforce Reads Metadata

↓

Downloads HTML

↓

Downloads CSS

↓

Downloads JavaScript

↓

Creates Component Instance

↓

Runs constructor()

↓

Runs connectedCallback()

↓

Processes HTML Template

↓

Creates Shadow DOM

↓

Browser Paints UI

↓

Runs renderedCallback()
```

---

# LWC Rendering Lifecycle

The lifecycle describes the stages every component goes through from creation until it is removed.

```
Create

↓

Initialize

↓

Connect

↓

Render

↓

Re-render

↓

Disconnect
```

---

# Lifecycle Hooks

## constructor()

Runs first.

Purpose:

- Initialize variables
- Call `super()`
- Basic object setup

Example

```javascript
constructor(){

    super();

    console.log('Constructor');

}
```

Avoid:

- Calling Apex
- Accessing template elements
- Manipulating the DOM

The DOM does not exist yet.

---

## connectedCallback()

Runs when the component is inserted into the DOM.

Purpose:

- Call Apex
- Subscribe to events
- Initialize data
- Start timers
- Load external libraries

Example

```javascript
connectedCallback(){

    console.log('Connected');

}
```

This is the most common place for initialization logic.

---

## render()

Most developers never override this method.

Its purpose is to choose which template should be rendered when multiple templates exist.

Example:

```javascript
render() {
    return templateOne;
}
```

For most components, the default rendering behavior is sufficient.

---

## renderedCallback()

Runs after the component has been rendered.

Purpose:

- Access DOM elements
- Integrate third-party JavaScript libraries
- Perform post-render operations

Example

```javascript
renderedCallback(){

    console.log('Rendered');

}
```

Be careful not to update reactive properties here without checks, as that can cause continuous re-rendering.

---

## disconnectedCallback()

Runs when the component is removed from the page.

Purpose:

- Remove event listeners
- Clear timers
- Unsubscribe from message channels
- Clean up resources

Example

```javascript
disconnectedCallback(){

    console.log('Disconnected');

}
```

---

# Rendering vs Re-rendering

## Initial Rendering

Occurs when the component loads for the first time.

```
constructor()

↓

connectedCallback()

↓

render()

↓

renderedCallback()
```

---

## Re-rendering

Whenever reactive data changes,

LWC updates only the affected DOM elements.

Example

```javascript
this.message = 'Updated';
```

LWC automatically refreshes the UI.

The lifecycle becomes:

```
render()

↓

renderedCallback()
```

Notice that:

- `constructor()` does **not** execute again.
- `connectedCallback()` does **not** execute again.

Only rendering occurs.

---

# Best Practices

### constructor()

✅ Initialize variables.

❌ Don't access the DOM.

❌ Don't call Apex.

---

### connectedCallback()

✅ Fetch data.

✅ Register listeners.

✅ Perform initialization.

---

### renderedCallback()

✅ Access template elements.

✅ Load third-party libraries.

❌ Avoid updating reactive properties repeatedly.

---

### disconnectedCallback()

✅ Clean up listeners.

✅ Stop timers.

✅ Release resources.

---

# Interview Questions

## What are the mandatory files in an LWC?

- HTML
- JavaScript
- Metadata (`.js-meta.xml`)

The CSS file is optional.

---

## Which lifecycle hook runs first?

```
constructor()
```

---

## Which lifecycle hook is used to call Apex?

Usually

```
connectedCallback()
```

or via the `@wire` decorator, depending on the use case.

---

## Which lifecycle hook is used to access DOM elements?

```
renderedCallback()
```

---

## What happens when a reactive property changes?

LWC re-renders only the affected DOM nodes.

The full component is not recreated.

---

## Can `connectedCallback()` execute multiple times?

Yes.

If the component is removed from the DOM and added again, `connectedCallback()` runs each time it is inserted.

---

## Difference between `constructor()` and `connectedCallback()`?

| constructor() | connectedCallback() |
|--------------|---------------------|
| Runs during object creation | Runs when component is inserted into the DOM |
| DOM is not available | Component is connected to the DOM |
| Initialize variables | Fetch data, subscribe to events |

---

# Key Takeaways

- Every LWC resides in its own folder inside the `lwc` directory.
- A standard component consists of HTML, JavaScript, CSS (optional), and a metadata file.
- Salesforce loads an LWC by reading its metadata, downloading resources, creating a component instance, and executing lifecycle hooks.
- The rendering lifecycle follows the sequence: `constructor()` → `connectedCallback()` → `render()` → `renderedCallback()`.
- When reactive data changes, LWC performs a **re-render**, updating only the necessary DOM elements instead of rebuilding the entire component.
- Proper use of lifecycle hooks leads to cleaner, more efficient, and maintainable components.

---

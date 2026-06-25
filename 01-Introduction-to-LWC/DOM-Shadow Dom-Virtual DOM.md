# 02 - DOM, Shadow DOM & Virtual DOM

> Learn the core concepts behind how Lightning Web Components render and update the UI. Understanding the DOM, Shadow DOM, and Virtual DOM is essential before diving into LWC development.

---

# Table of Contents

- What is the DOM?
- How the Browser Creates the DOM
- DOM Tree
- DOM Manipulation
- Why Frequent DOM Updates Are Expensive
- What is Shadow DOM?
- Why Shadow DOM Exists
- Shadow DOM in LWC
- Benefits of Shadow DOM
- What is Virtual DOM?
- Does LWC Use Virtual DOM?
- DOM vs Shadow DOM vs Virtual DOM
- Interview Questions
- Key Takeaways

---

# Introduction

Whenever you open a website, your browser doesn't work directly with the HTML file.

Instead, it converts the HTML into different structures that help display and update the webpage efficiently.

These structures are:

- DOM (Document Object Model)
- Shadow DOM
- Virtual DOM (used by some frameworks)

Lightning Web Components relies heavily on **DOM** and **Shadow DOM**, while using its own optimized rendering engine instead of a traditional Virtual DOM.

---

# What is DOM?

**DOM (Document Object Model)** is a tree-like representation of an HTML document.

The browser converts every HTML element into an object that JavaScript can access and modify.

Instead of treating HTML as plain text, the browser creates a structured tree.

---

## Example HTML

```html
<body>
    <h1>Welcome</h1>
    <button>Save</button>
</body>
```

---

## DOM Tree

```
Document
│
└── html
      │
      └── body
             │
             ├── h1
             │      └── Welcome
             │
             └── button
                    └── Save
```

Each HTML element becomes a node in the DOM tree.

---

# Why Does the Browser Create the DOM?

Imagine JavaScript wants to change

```
Welcome
```

to

```
Hello User
```

Without the DOM, JavaScript would have to search through the HTML file.

Instead, it directly accesses the corresponding DOM node.

Example:

```javascript
document.querySelector('h1').textContent = 'Hello User';
```

Only the `<h1>` element changes.

The entire page does **not** reload.

---

# DOM is Live

The DOM is a **live representation** of the webpage.

Whenever JavaScript changes something, the DOM updates immediately.

Example:

Before:

```
Button
Label = Save
```

JavaScript:

```javascript
button.textContent = "Submit";
```

After:

```
Button
Label = Submit
```

---

# DOM Manipulation

JavaScript can interact with the DOM in many ways.

It can:

- Create elements
- Delete elements
- Update text
- Change CSS
- Add attributes
- Remove attributes
- Listen to events

Example:

```javascript
const heading = document.querySelector('h1');

heading.style.color = 'blue';
```

---

# Why Frequent DOM Updates Are Expensive

Updating the DOM is one of the most expensive operations performed by the browser.

Imagine a page containing:

- 1000 Records
- 200 Buttons
- 150 Images
- 300 Cards

If one small value changes, the browser may need to:

- Recalculate Layout
- Repaint Elements
- Update Rendering

Frequent DOM updates reduce application performance.

This is why modern frameworks optimize DOM manipulation.

---

# What is Shadow DOM?

**Shadow DOM** is a browser feature that creates a **private DOM tree** for a component.

This keeps the component's HTML and CSS isolated from the rest of the page.

Think of it as giving every component its own private workspace.

---

# Why Shadow DOM Exists

Imagine two developers create two different components.

Component A

```css
button{
    background:red;
}
```

Component B

```css
button{
    background:green;
}
```

Without Shadow DOM,

both CSS rules could affect each other.

This leads to unexpected styling issues.

---

# Shadow DOM Solves This Problem

Each component receives its own isolated DOM.

```
Page DOM

│

├── Header

├── Footer

└── Account Component

        │

        └── Shadow DOM

                │

                ├── Button

                └── Text
```

The component's HTML and CSS remain private.

---

# Example

LWC HTML

```html
<template>

    <h1>Hello</h1>

</template>
```

Browser Structure

```
My Component

│

└── Shadow Root

        │

        └── h1
```

The `<h1>` exists only inside that component.

---

# Shadow DOM in LWC

Every Lightning Web Component automatically gets its own Shadow DOM (native or synthetic depending on the environment).

Example

```
Parent Component

│

├── Child Component A
│      Shadow DOM

├── Child Component B
│      Shadow DOM

└── Child Component C
       Shadow DOM
```

Each component has its own isolated HTML and CSS.

---

# Benefits of Shadow DOM

## 1. CSS Isolation

Styles inside one component do not affect other components.

---

## 2. Encapsulation

The internal implementation remains private.

Other components cannot directly manipulate it.

---

## 3. Component Reusability

Developers can reuse components without worrying about CSS conflicts.

---

## 4. Better Maintainability

Components become easier to debug and maintain.

---

# Can Parent Components Access Child Shadow DOM?

Normally,

**No.**

A parent component cannot directly access the child's internal HTML.

Communication should happen using:

- `@api`
- Public Methods
- Custom Events

This keeps components loosely coupled.

---

# Real-Life Analogy

Imagine an apartment building.

```
Apartment A

Kitchen
Bedroom
Hall
```

```
Apartment B

Kitchen
Bedroom
Hall
```

Apartment A cannot rearrange Apartment B's furniture.

Every apartment has its own private space.

Shadow DOM works the same way.

---

# What is Virtual DOM?

Updating the real DOM repeatedly is expensive.

To improve performance, some JavaScript frameworks create a lightweight copy of the DOM in memory.

This copy is called the **Virtual DOM**.

Instead of updating the real DOM immediately,

the framework compares the old Virtual DOM with the new Virtual DOM.

Only the changed elements are updated.

---

# Virtual DOM Flow

```
Real DOM

↓

Virtual DOM

↓

Compare Changes

↓

Update Only Differences

↓

Real DOM
```

This comparison process is called **Diffing**.

---

# Example

Old Virtual DOM

```
Name

Age

City
```

New Virtual DOM

```
Name

Age

Country
```

Only

```
City

↓

Country
```

gets updated in the real DOM.

Everything else remains unchanged.

---

# Benefits of Virtual DOM

- Faster UI updates
- Reduced DOM manipulation
- Better application performance
- Fewer browser repaint operations

---

# Does LWC Use Virtual DOM?

This is one of the most frequently asked interview questions.

### Answer

**No.**

Lightning Web Components does **not** use a traditional Virtual DOM like React.

Instead, LWC uses a **compiler-based rendering engine**.

During compilation, Salesforce converts your HTML templates into optimized JavaScript instructions.

When reactive data changes:

- LWC knows exactly which DOM elements depend on that data.
- Only those specific elements are updated.
- No full Virtual DOM tree needs to be created or compared.

This makes LWC extremely efficient.

---

# DOM vs Shadow DOM vs Virtual DOM

| Feature | DOM | Shadow DOM | Virtual DOM |
|----------|-----|------------|-------------|
| Type | Browser Feature | Browser Feature | Framework Technique |
| Purpose | Represents HTML | Encapsulates Components | Optimizes Rendering |
| Used By | Every Website | Modern Web Components | React and Similar Frameworks |
| Creates Private DOM | No | Yes | No |
| Improves Performance | No | Indirectly | Yes |
| Used in LWC | Yes | Yes | No (Traditional Virtual DOM) |

---

# Complete Rendering Flow in LWC

```
HTML

↓

Browser Creates DOM

↓

LWC Creates Shadow DOM

↓

Reactive Data Changes

↓

LWC Rendering Engine

↓

Only Required DOM Nodes Update

↓

Browser Paints Changes
```

---

# Interview Questions

## What is DOM?

The Document Object Model (DOM) is a tree-like representation of an HTML document that allows JavaScript to dynamically access and manipulate webpage elements.

---

## What is Shadow DOM?

Shadow DOM is a browser feature that provides encapsulation by creating a private DOM tree for a component.

---

## Why does LWC use Shadow DOM?

LWC uses Shadow DOM to:

- Isolate CSS
- Prevent style conflicts
- Improve component reusability
- Achieve encapsulation

---

## What is Virtual DOM?

Virtual DOM is a lightweight copy of the real DOM used by frameworks like React to efficiently update only changed elements.

---

## Does LWC use Virtual DOM?

No.

LWC uses a compiler-based rendering engine that generates optimized DOM update instructions instead of maintaining a traditional Virtual DOM.

---

## Difference between DOM, Shadow DOM and Virtual DOM?

- **DOM** represents the webpage.
- **Shadow DOM** creates a private DOM for a component.
- **Virtual DOM** is a rendering optimization technique used by frameworks like React.

---

# Key Takeaways

- The **DOM** is the browser's live representation of an HTML page.
- JavaScript updates the DOM to change the UI dynamically.
- Frequent DOM updates can reduce performance.
- **Shadow DOM** isolates a component's HTML and CSS from the rest of the page.
- Every LWC component uses Shadow DOM (native or synthetic) for encapsulation.
- **Virtual DOM** is an optimization technique used by some frameworks, but **LWC does not use a traditional Virtual DOM**.
- LWC relies on a compiler-based rendering engine that updates only the necessary DOM elements, making it fast and efficient.

---

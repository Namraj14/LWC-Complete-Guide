# Introduction to Lightning Web Components (LWC)

## Table of Contents

- What is LWC?
- Why was LWC introduced?
- Evolution of UI Frameworks in Salesforce
- Why Components?
- Browser and Web Components
- LWC Architecture
- Advantages of LWC
- Aura vs LWC
- Real World Example
- Summary
- Interview Questions
- Scenario Questions

---

# What is Lightning Web Components?

Lightning Web Components (LWC) is Salesforce's modern UI framework for building reusable, fast, and standards-based user interfaces using HTML, JavaScript, and CSS.

Unlike Aura Components, LWC is built on native Web Component standards and modern JavaScript.

---

# Why was LWC introduced?

Aura was powerful but introduced additional framework overhead and proprietary concepts. Modern browsers became capable of supporting standardized component technologies, allowing Salesforce to build a lighter and faster framework.

LWC leverages:
- Native JavaScript (ES6+)
- Web Components
- Shadow DOM
- Custom Elements
- ES Modules

---

# Evolution of Salesforce UI

Visualforce
↓

Aura Components

↓

Lightning Web Components

---

# Why Components?

Instead of building one huge page, applications are divided into smaller reusable parts.

Examples:
- Account Header
- Related List
- Activity Timeline
- Chatter
- Opportunity Chart

Each is a component.

Benefits:
- Reusable
- Independent
- Easier to maintain
- Better performance

---

# Advantages of LWC

- Faster rendering
- Modern JavaScript
- Better browser performance
- Component reusability
- Easier testing
- Standards-based development

---

# Aura vs LWC

| Aura | LWC |
|------|------|
| Proprietary Framework | Web Standards |
| More Framework Overhead | Lightweight |
| Slower Rendering | Faster Rendering |
| Uses Aura Syntax | Uses HTML, JS, CSS |
| Complex Event Model | Standard DOM Events |

---

# Real World Example

Imagine an Account Record Page.

Instead of loading one massive page:

Account Page

├── Highlights Panel

├── Related List

├── Activity Timeline

├── Notes

├── Chatter

└── Custom Components

Each section is its own Lightning Web Component.

If the Activity Timeline changes, Salesforce only updates that component instead of refreshing the whole page.

---

# Summary

✔ LWC is Salesforce's modern UI framework.

✔ It uses native browser technologies.

✔ Components are reusable building blocks.

✔ LWC provides better performance than Aura.

---

# Interview Questions

1. What is Lightning Web Components?
2. Why did Salesforce introduce LWC?
3. Why is LWC faster than Aura?
4. What are Web Components?
5. Can Aura and LWC coexist?

---

# Scenario Question

Your client has an Aura component that loads slowly and is difficult to maintain. They ask whether it should be migrated to LWC.

How would you evaluate the migration, and what factors would you consider before recommending it?

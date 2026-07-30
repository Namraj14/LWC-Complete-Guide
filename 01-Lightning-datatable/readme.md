# LWC Practice – Display Accounts (Common Mistakes & lightning-datatable Notes)

# Understanding `lightning-datatable`

Before using a `lightning-datatable`, it's important to understand how it works.

Unlike a normal LWC where you use:

```html
<template for:each={accounts} for:item="account">
```

you **do not** use `for:each` with `lightning-datatable`.

Why?

Because **`lightning-datatable` automatically loops through the records for you.**

You simply provide:

* an **array of records** using the `data` property.
* an **array of column definitions** using the `columns` property.

Example:

```html
<lightning-datatable
    key-field="Id"
    data={accounts}
    columns={columns}>
</lightning-datatable>
```

If `accounts` contains:

```javascript
[
    {
        Id: "001",
        Name: "Acme",
        Industry: "Technology",
        AnnualRevenue: 5000000
    },
    {
        Id: "002",
        Name: "Google",
        Industry: "Technology",
        AnnualRevenue: 100000000
    }
]
```

and `columns` contains:

```javascript
[
    {
        label: "Name",
        fieldName: "Name"
    },
    {
        label: "Industry",
        fieldName: "Industry"
    }
]
```

the datatable automatically renders:

| Name   | Industry   |
| ------ | ---------- |
| Acme   | Technology |
| Google | Technology |

No `for:each` is required because the component handles the iteration internally.

---

# What `data` Expects

The `data` property must always be an **array of JavaScript objects**.

Example:

```javascript
this.accounts = [
    {
        Id: "001",
        Name: "Acme"
    },
    {
        Id: "002",
        Name: "Google"
    }
];
```

Since your Apex method returns:

```apex
List<Account>
```

the `@wire` service gives you:

```javascript
data = [
    {
        Id: "...",
        Name: "...",
        Industry: "...",
        AnnualRevenue: ...
    }
];
```

which is exactly what `lightning-datatable` expects.

---

# What `columns` Expects

The `columns` property is also an **array**, but instead of records, each object describes one column.

Example:

```javascript
columns = [
    {
        label: "Name",
        fieldName: "Name",
        type: "text"
    },
    {
        label: "Industry",
        fieldName: "Industry",
        type: "text"
    },
    {
        label: "Annual Revenue",
        fieldName: "AnnualRevenue",
        type: "currency"
    }
];
```

Think of it like this:

* `data` → **Rows**
* `columns` → **Column definitions**

---

# How the Datatable Matches Data

Suppose one record is:

```javascript
{
    Id: "001",
    Name: "Acme",
    Industry: "Technology"
}
```

and one column is:

```javascript
{
    label: "Account Name",
    fieldName: "Name"
}
```

Internally, the datatable does something similar to:

```javascript
record["Name"]
```

which returns:

```text
Acme
```

That value is displayed in the cell.

If you write:

```javascript
fieldName: "name"
```

the datatable looks for:

```javascript
record["name"]
```

Since that property doesn't exist, the cell is blank.

---

# Common Mistakes

## 1. `lightning-card` uses `title`, not `label`

### ❌ Incorrect

```html
<lightning-card label="Display Accounts">
```

### ✅ Correct

```html
<lightning-card title="Display Accounts">
```

**Reason**

* `lightning-card` does not have a `label` attribute.
* The heading displayed on the card is controlled by the `title` attribute.

---

## 2. `key-field` must match the record field exactly

### ❌ Incorrect

```html
key-field="id"
```

### ✅ Correct

```html
key-field="Id"
```

**Reason**

The records returned from Apex look like:

```javascript
{
    Id: "001XXXXXXXXXXXX",
    Name: "Acme",
    Industry: "Technology",
    AnnualRevenue: 5000000
}
```

The property is `Id`, not `id`.

`lightning-datatable` is case-sensitive, so `key-field` must exactly match the object's property name.

---

## 3. Column property is `label`, not `Label`

### ❌ Incorrect

```javascript
{
    Label: "Name"
}
```

### ✅ Correct

```javascript
{
    label: "Name"
}
```

**Reason**

The datatable API expects the property name `label`.

---

## 4. `fieldName` must match the Salesforce field API name

### ❌ Incorrect

```javascript
fieldName: "name"
fieldName: "industry"
```

### ✅ Correct

```javascript
fieldName: "Name"
fieldName: "Industry"
```

**Reason**

The datatable looks for the exact property name on each record.

`Name` and `name` are different properties in JavaScript.

---

## 5. `hide-checkbox-column`

### ❌ Less Preferred

```html
hide-checkbox-column=true
```

### ✅ Preferred

```html
hide-checkbox-column
```

or

```html
hide-checkbox-column={true}
```

**Reason**

Boolean attributes in LWC are normally written without assigning `true`.

---

# Quick Summary

* `lightning-datatable` automatically loops through records.
* No `for:each` is needed.
* `data` must be an array of objects.
* `columns` must be an array of column definitions.
* `fieldName` must exactly match the property name in the data.
* `key-field` should usually be `Id`.
* Everything is case-sensitive.

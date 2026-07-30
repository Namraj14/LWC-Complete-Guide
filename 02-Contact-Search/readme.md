# Why Do We Use `.then()` in Imperative Apex Calls?

## What is an Imperative Apex Call?

An imperative Apex call is when we **call an Apex method ourselves** from JavaScript.

Example:

```javascript
searchContacts({ searchText: this.searchText });
```

Unlike `@wire`, this call is **asynchronous**.

That means Salesforce needs some time to execute the Apex method and return the data.

---

# Why `.then()`?

When an imperative Apex method is called, it **does not return the data immediately**.

Instead, it returns a **Promise**.

```javascript
const result = searchContacts({ searchText: this.searchText });

console.log(result);
```

Output:

```text
Promise { <pending> }
```

The database query is still running.

When Salesforce finishes the query, the Promise is **resolved**, and `.then()` is executed.

Example:

```javascript
searchContacts({ searchText: this.searchText })
    .then(result => {
        this.contacts = result;
    });
```

Here:

* `result` contains the data returned from Apex.
* We store that data in `this.contacts`.

---

# Why `.catch()`?

If something goes wrong in Apex, the Promise is **rejected**.

Then `.catch()` runs.

Example:

```javascript
searchContacts({ searchText: this.searchText })
    .then(result => {
        this.contacts = result;
    })
    .catch(error => {
        console.log(error);
    });
```

Use `.catch()` to handle errors.

---

# Flow

```text
Call Apex
    │
    ▼
Returns a Promise
    │
    ├── Success → .then()
    │
    └── Error → .catch()
```

---

# `@wire` vs Imperative

## `@wire`

```javascript
@wire(getAccounts)
wiredAccounts({ data, error }) {
    if (data) {
        this.accounts = data;
    }
}
```

* Salesforce calls the Apex method automatically.
* No `.then()` or `.catch()` is needed.
* The wire service gives you `data` or `error`.

---

## Imperative

```javascript
searchContacts({ searchText: this.searchText })
    .then(result => {
        this.contacts = result;
    })
    .catch(error => {
        console.log(error);
    });
```

* You call the Apex method manually.
* The method returns a Promise.
* Use `.then()` for success.
* Use `.catch()` for errors.

---

# Easy Analogy

Imagine ordering food online.

1. You place the order.
2. The restaurant prepares the food.
3. When it's ready, it gets delivered.

Similarly:

* Call Apex → Place the order.
* Apex processes the request.
* `.then()` → Data is returned.
* `.catch()` → Something went wrong.

---

# Quick Summary

* Imperative Apex calls return a **Promise**.
* A Promise means the result will come later.
* Use `.then()` to get the returned data.
* Use `.catch()` to handle errors.
* `@wire` does not use `.then()` because the wire service handles the asynchronous call for you.

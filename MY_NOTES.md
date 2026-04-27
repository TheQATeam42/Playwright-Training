# 📓 My Personal Notes — Playwright Framework
> This is my learning journal. I write here what I learn each day.
> This becomes my exam explanation.

---

## 📅 Day 1 — Understanding the Project Structure

### What is this project?
This project is a **test automation framework** built with:
- **Playwright** — a tool that controls a real browser automatically (like a robot using Chrome)
- **TypeScript** — a programming language that is JavaScript with types added

It tests **two real websites**:
1. `https://www.saucedemo.com` — a demo shopping site (SwagLabs)
2. `https://hub.testingtalks.com.au` — a contacts management app (ReactApp)

---

## 🗺️ Project Structure — What Each Folder Does

```
Playwright-Training/
│
├── .env                    ← Secret settings (URLs, browser mode)
├── playwright.config.ts    ← Master settings for Playwright
├── package.json            ← List of all installed tools/libraries
│
├── sharedFiles/            ← SHARED CODE — used by both apps
│   ├── pages/
│   │   └── basePage.page.ts        ← Parent class for all pages
│   ├── components/
│   │   └── baseComponent.ts        ← Parent class for all components
│   └── utils/
│       ├── parseEnv.util.ts        ← Reads the .env file
│       ├── lazyFixture.util.ts     ← Creates page objects on demand
│       ├── urlHelper.util.ts       ← Manages URLs
│       └── testTypes.util.ts       ← Labels like @Smoke, @Regression
│
├── srcReactApp/            ← All tests for the Contacts App
│   ├── pages/
│   │   └── contacts.page.ts        ← Contacts list page object
│   ├── components/
│   │   └── contact.component.ts    ← One contact card
│   ├── fixtures/
│   │   └── reactAppFixtures.ts     ← Makes contacts() available in tests
│   ├── tests/
│   │   ├── react_app.spec.ts       ← THE TEST FILE (I write here)
│   │   └── setup/
│   │       └── testLevelHooks.setup.ts  ← Auto-navigates before each test
│   └── utils/
│       └── endpoints.util.ts       ← URL paths (/contacts, /home...)
│
└── srcSwagLabs/            ← All tests for SauceDemo (login site)
    ├── pages/
    │   └── loginPage.page.ts       ← Login page object
    ├── components/
    │   └── item.component.ts       ← Product item card
    ├── fixtures/
    │   └── swagLabsFixtures.ts     ← Makes loginPage() available in tests
    ├── tests/
    │   ├── first.spec.ts           ← THE TEST FILE (login tests)
    │   └── setup/
    │       └── testLevelHooks.setup.ts  ← Auto-navigates before each test
    └── utils/
        └── endpoints.util.ts       ← URL paths (/inventory.html...)
```

---

## 🚪 What Is the Entry Point?

The **entry point** is where everything starts. In this framework there are two entry points — one for each website being tested.

### When I run `npx playwright test --project="react app"`:

**Step 1** — Playwright reads `playwright.config.ts`:
```typescript
projects: [
  {
    name: "react app",
    testDir: "srcReactApp",           // ← looks in this folder
    use: { baseURL: "https://hub.testingtalks.com.au" }
  }
]
```

**Step 2** — Playwright finds test files (files ending in `.spec.ts`) inside `srcReactApp/`

**Step 3** — Before each test runs, `testLevelHooks.setup.ts` is executed:
```typescript
reactAppTest.beforeEach(async ({ page }, testInfo) => {
  const baseUrl = testInfo.project.use.baseURL;
  UrlHelper.setBaseUrl(baseUrl);
  await page.goto(UrlHelper.baseUrl);  // ← Opens the browser at the URL
});
```

**Step 4** — My test runs (the code I wrote in `react_app.spec.ts`)

**Step 5** — After the test, `afterEach` closes the browser tab

### So the entry point chain is:
```
playwright.config.ts → react_app.spec.ts → testLevelHooks.setup.ts → my test code
```

---

## 🧱 Design Pattern: Page Object Model (POM)

The instructor used a pattern called **Page Object Model**. The idea is:

- Every web page has its OWN class (a "page object")
- The class stores **locators** (how to find buttons, inputs, etc.)
- The class stores **methods** (what you can do on that page)
- The **test file** only CALLS methods — it never finds elements directly

### Why is this good?
If the website changes a button's ID, I only fix it in ONE place (the page class), not in every test.

### Example from my project:
```
contacts.page.ts         ← stores locators and methods for contacts page
contact.component.ts     ← stores locators and methods for ONE contact card
react_app.spec.ts        ← calls those methods to write the test
```

---

## 🧬 Class Inheritance in This Project

```
BasePage (sharedFiles/pages/basePage.page.ts)
   │   → gives this.page (browser tab) to all child classes
   │
   ├── Contacts (srcReactApp/pages/contacts.page.ts)
   │     → the contacts list page
   │
   ├── LoginPage (srcSwagLabs/pages/loginPage.page.ts)
   │     → the SauceDemo login page
   │
   └── BaseComponent (sharedFiles/components/baseComponent.component.ts)
         │   → also gets this.page
         │
         ├── Contact (srcReactApp/components/contact.component.ts)
         │     → one contact card (has name, deleteButton, delete() etc.)
         │
         └── Item (srcSwagLabs/components/item.component.ts)
               → one product card (empty - not used yet)
```

**What does `extends` mean?**
When I write `class LoginPage extends BasePage`, it means LoginPage INHERITS everything from BasePage. So I get `this.page` for free without writing the constructor again.

---

## 🔌 How Fixtures Work

A **fixture** is a way to make page objects automatically available in tests.

```typescript
// In reactAppFixtures.ts:
const baseTest = test.extend<Pages>({
  contacts: lazyFixture(Contacts),   // ← connects "contacts" name to Contacts class
});
```

```typescript
// In my test:
async ({ contacts, page }) => {      // ← "contacts" comes from the fixture
  contacts().searchContacts("John"); // ← I call it as a function
}
```

**Why is it called `lazyFixture`?**
"Lazy" means it waits until you actually USE it before creating the object. If a test doesn't use `contacts()`, no `Contacts` object is created. This saves memory.

---

## 🔑 How the URL Gets to the Browser

```
.env file:
  REACT_BASE_URL = https://hub.testingtalks.com.au/
         ↓
parseEnv.util.ts reads it:
  EnvironmentConfig.reactAppUrl → returns the URL string
         ↓
playwright.config.ts uses it:
  use: { baseURL: EnvironmentConfig.reactAppUrl }
         ↓
testLevelHooks.setup.ts reads it from testInfo:
  const baseUrl = testInfo.project.use.baseURL
  await page.goto(baseUrl)          ← ✅ browser opens at the URL
         ↓
My test starts — browser is already on the right page!
```

**I never write `page.goto(url)` in my test** — the framework does it for me automatically before each test.

---

## 🛠️ Key TypeScript Concepts I Used

| Concept | What it means | Where I saw it |
|---|---|---|
| `class` | A blueprint for creating objects | All page/component files |
| `extends` | Inherit from a parent class | `LoginPage extends BasePage` |
| `abstract` | Cannot create this class directly — only subclasses | `BasePage`, `BaseComponent` |
| `protected` | Accessible in this class AND child classes | `protected readonly page` in BasePage |
| `private` | Only accessible inside this class | `private root: Locator` in Contact |
| `async/await` | Wait for browser actions to complete | All methods that touch the browser |
| `enum` | A list of named constants | `SwagLabsEndpoints`, `ReactAppEndpoints` |
| `Promise<T>` | A value that will arrive in the future | Return type of async methods |
| `Locator` | Playwright's way to describe where to find an element | All page/component files |
| `get` | A getter property — access like a property, not a function | `get name()`, `get deleteButton()` |

---

## 📋 My Test — What It Does (for exam)

**File**: `srcReactApp/tests/react_app.spec.ts`

**Test name**: "search and delete contact"

**What the test does (step by step)**:

1. ✅ **Navigate** — browser opens automatically at `https://hub.testingtalks.com.au/`
2. ✅ **Verify search bar** — check the search input is visible on screen
3. ✅ **Get random contact** — pick a random existing contact from the list, save its name
4. ✅ **Search** — type that name into the search bar
5. ✅ **Verify result** — confirm only 1 contact appears in the list
6. ✅ **Delete** — click the Delete button (a popup appears)
7. ✅ **Confirm deletion** — handle the browser dialog by clicking Ok
8. ✅ **Verify deleted** — check the contact is no longer in the list
9. ✅ **Refresh** — reload the page
10. ✅ **Verify restored** — confirm the contact is back (deletions don't save — expected behavior)

**Methods I used from the framework**:
- `contacts().isSearchInputVisible()` — Step 2
- `contacts().getRandomContactName()` — Step 3
- `contacts().searchContacts(name)` — Step 4
- `contacts().getContactCount()` — Step 5
- `contacts().getContactComponentByIndex(0).delete()` + dialog handler — Steps 6+7
- `contacts().isContactInList(name)` — Steps 8 and 10
- `page.reload()` — Step 9

---

## ❓ Things I Still Have Questions About

_(Write your questions here as you go)_

- [ ] How does `lazyFixture` know which `page` to use when there are multiple tests?
- [ ] What happens if the search returns 0 results — does the test fail gracefully?
- [ ] Can I run just one specific test without running all of them?

---

## 📌 Commands I Need to Know

```bash
# Install dependencies (run once)
npm install

# Install Playwright browsers (run once)
npx playwright install

# Run all tests
npx playwright test

# Run only React App tests
npx playwright test --project="react app"

# Run only Smoke tests
npx playwright test --grep "@Smoke"

# See the HTML report after running
npx playwright show-report playwright-report
```

---
*Last updated: Day 1 of learning*

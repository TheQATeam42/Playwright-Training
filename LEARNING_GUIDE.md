# 📚 Complete Project Review & Learning Guide
> Written specifically for you — explaining every file, every pattern, and every bug found.

---

## 🗺️ Table of Contents
1. [What Is This Project?](#1-what-is-this-project)
2. [The Big Picture — Architecture Map](#2-the-big-picture--architecture-map)
3. [How Data Flows From Test to Browser](#3-how-data-flows-from-test-to-browser)
4. [File-by-File Explanation](#4-file-by-file-explanation)
   - [Configuration Files](#-configuration-files)
   - [Shared Files (The Foundation)](#-shared-files-the-foundation)
   - [SwagLabs App](#-swag-labs-app-saucedemocom)
   - [ReactApp](#-react-app-hubtestingtalkscomau)
5. [Design Patterns Used](#5-design-patterns-used)
6. [Bugs Found in the Project](#6-bugs-found-in-the-project)
7. [What Is Complete vs What Needs Work](#7-what-is-complete-vs-what-needs-work)
8. [Step-by-Step Fix Plan](#8-step-by-step-fix-plan)
9. [Key TypeScript Concepts Used Here](#9-key-typescript-concepts-used-here)
10. [Running the Tests](#10-running-the-tests)

---

## 1. What Is This Project?

This is a **Playwright + TypeScript test automation framework** that tests **two real websites**:

| Project Name | Website | What It Tests |
|---|---|---|
| **swag labs** | `https://www.saucedemo.com` | Login functionality of a demo shopping site |
| **react app** | `https://hub.testingtalks.com.au` | Contacts list (add, search, delete contacts) |

The instructor built a **professional framework** (the structure/skeleton) and your job is to **write the actual test steps** inside the test files.

---

## 2. The Big Picture — Architecture Map

```
Playwright-Training/
│
├── playwright.config.ts         ← 🎛️  Master settings (browser, timeouts, which projects to run)
├── .env                         ← 🔑  Secret settings (URLs, headless mode)
│
├── sharedFiles/                 ← 🏛️  FOUNDATION (used by BOTH apps)
│   ├── pages/
│   │   └── basePage.page.ts     ← The root parent class for ALL pages
│   ├── components/
│   │   └── baseComponent.ts     ← The root parent class for ALL components
│   └── utils/
│       ├── parseEnv.util.ts     ← Reads .env file safely
│       ├── lazyFixture.util.ts  ← Smart factory for creating page objects
│       ├── testTypes.util.ts    ← Labels for test categories (@Smoke, etc.)
│       └── urlHelper.util.ts    ← Manages URLs (set, get, validate)
│
├── srcSwagLabs/                 ← 🛒  SwagLabs app tests
│   ├── pages/
│   │   └── loginPage.page.ts   ← Locators for the login page
│   ├── components/
│   │   └── item.component.ts   ← (empty - for future product items)
│   ├── fixtures/
│   │   └── swagLabsFixtures.ts ← Makes loginPage available in tests
│   ├── tests/
│   │   ├── first.spec.ts       ← ⚠️ INCOMPLETE - your login tests go here
│   │   └── setup/
│   │       └── testLevelHooks.setup.ts ← beforeEach / afterEach hooks
│   └── utils/
│       └── endpoints.util.ts   ← URL paths (/inventory.html, /cart.html)
│
└── srcReactApp/                 ← 📋  React App contacts tests
    ├── pages/
    │   └── contacts.page.ts    ← ✅ COMPLETE - full contacts page object
    ├── components/
    │   └── contact.component.ts ← ✅ COMPLETE - single contact card
    ├── fixtures/
    │   └── reactAppFixtures.ts ← Makes contacts available in tests
    ├── tests/
    │   ├── react_app.spec.ts   ← 🐛 HAS BUGS - needs fixing
    │   └── setup/
    │       └── testLevelHooks.setup.ts ← beforeEach / afterEach hooks
    └── utils/
        └── endpoints.util.ts   ← URL paths (/contacts, /home, /login)
```

---

## 3. How Data Flows From Test to Browser

Understanding this flow is the KEY to understanding the whole framework.
Follow this path from top to bottom:

```
📄 TEST FILE (react_app.spec.ts)
    │
    │  imports
    ▼
📄 testLevelHooks.setup.ts
    │  - runs beforeEach → navigates to the URL
    │  - runs afterEach  → closes the page
    │  imports
    ▼
📄 reactAppFixtures.ts
    │  - defines what fixtures (page objects) are available
    │  - uses lazyFixture to create them only when needed
    │  imports
    ▼
📄 contacts.page.ts (Page Object)
    │  - extends BasePage (gets `this.page`)
    │  - defines Locators (how to find elements)
    │  - defines Methods (what to do on the page)
    │  imports
    ▼
📄 contact.component.ts (Component)
    │  - extends BaseComponent
    │  - represents ONE contact card
    │  - has getName(), delete() methods
    │
    ▼
🌐 REAL BROWSER (Chromium)
    - Playwright drives the browser
    - Clicks, fills, reads text, etc.
```

---

## 4. File-by-File Explanation

### 📁 Configuration Files

---

#### `.env` — Environment Variables
```
SWAG_BASE_URL = https://www.saucedemo.com
REACT_BASE_URL = https://hub.testingtalks.com.au/
HEADLESS = false
```
- **What it is**: A secret settings file (never committed to Git)
- `HEADLESS = false` → You WILL see the browser window open during tests
- `HEADLESS = true` → Browser runs invisibly in the background
- These values are read by `parseEnv.util.ts`

---

#### `playwright.config.ts` — Master Configuration
```typescript
export default defineConfig({
  timeout: 30 * 1000,      // each test has 30 seconds max
  expect: { timeout: 5000 }, // each assertion has 5 seconds to pass
  use: {
    headless: BrowserConfig.headless,  // reads from .env
    screenshot: "on",                   // always take screenshots
    trace: "retain-on-failure",         // save trace on failure
  },
  projects: [
    { name: "react app",  testDir: "srcReactApp",  ... },
    { name: "swag labs",  testDir: "srcSwagLabs",  ... },
  ]
});
```
- **Two projects** = two separate test suites, each with their own base URL
- When you run `npx playwright test --project="swag labs"` it only runs SwagLabs tests

---

#### `tsconfig.json` — TypeScript Configuration
- Tells TypeScript how to compile your `.ts` files
- Defines what TypeScript features are allowed
- The ESLint file (`.eslintrc.json`) references this to understand your TypeScript version

---

#### `.eslintrc.json` — Code Quality Rules
Important rules enforced:
- `"semi": ["error", "always"]` → Every line must end with `;`
- `"quotes": ["error", "double"]` → Must use `"double quotes"` not `'single'`
- `"indent": ["error", 2]` → Must indent with 2 spaces
- `"require-await": "error"` → If a function is `async`, it MUST use `await` inside
- `"no-unused-vars"` → Variables you declare must be used

---

### 📁 Shared Files (The Foundation)

---

#### `sharedFiles/pages/basePage.page.ts`
```typescript
export default abstract class BasePage {
  constructor(protected readonly page: Page) {}
}
```
**What it does**: The ROOT parent class for all page objects.

| Keyword | Meaning |
|---|---|
| `abstract` | You cannot create `new BasePage()` directly — only subclasses |
| `protected` | `page` is accessible in THIS class AND all child classes |
| `readonly` | `page` cannot be reassigned after the constructor |
| `Page` | Playwright's object representing one browser tab |

**Why it exists**: Every page needs `this.page` to interact with the browser. Instead of writing `constructor(page: Page) { this.page = page; }` in EVERY page class, we write it ONCE here and all pages inherit it.

---

#### `sharedFiles/components/baseComponent.component.ts`
```typescript
export default abstract class BaseComponent extends BasePage {
}
```
**What it does**: The ROOT parent class for all components.
- It `extends BasePage` — so components ALSO get `this.page`
- Currently empty — ready to add shared component methods later
- **Components** are parts of a page (like one row in a table, one product card, etc.)

---

#### `sharedFiles/utils/parseEnv.util.ts`
**What it does**: Safely reads the `.env` file values.

```typescript
// Three helper functions:
readStringEnv("KEY")   → returns a string  (throws if missing)
readBooleanEnv("KEY")  → returns true/false (throws if not "true" or "false")
readNumberEnv("KEY")   → returns a number  (throws if not a valid number)

// Two exported classes:
BrowserConfig.headless       → boolean (from HEADLESS env var)
EnvironmentConfig.swagLabsUrl → string (from SWAG_BASE_URL)
EnvironmentConfig.reactAppUrl → string (from REACT_BASE_URL)
```

**Why it's important**: `playwright.config.ts` uses these to set browser behavior and URLs.

---

#### `sharedFiles/utils/lazyFixture.util.ts`
**What it does**: A "smart factory" that creates page object instances only when needed.

```typescript
function lazyFixture<T>(pageClass: new (page: Page) => T) {
  return ({ page }, use) => {
    let instance: T | null = null;           // starts empty
    const lazyInstance = () => {
      if (!instance) {
        instance = new pageClass(page);      // create only when first called
      }
      return instance;                       // return the same object always
    };
    use(lazyInstance);
  };
}
```

**In plain English**: 
- Takes any Page class (like `LoginPage` or `Contacts`)
- Returns a function `() => LoginPage` (a getter)
- The first time you call `loginPage()` in a test, it creates the object
- Every call after returns the SAME object (not a new one each time)
- This is the **Lazy Initialization** design pattern

**How it's used in tests**:
```typescript
// In the test you call it like a function:
const page = loginPage();    // first call → creates LoginPage
const page2 = loginPage();   // second call → returns SAME LoginPage
```

---

#### `sharedFiles/utils/testTypes.util.ts`
```typescript
enum TestType {
  Regression = "@Regression",
  Smoke = "@Smoke",
  Sanity = "@Sanity",
  Negative = "@Negative",
  // ...
}
```
**What it does**: Labels for categorizing tests.
- Use them in test names: `"Login with valid credentials @Smoke"`
- Then run only smoke tests: `npx playwright test --grep @Smoke`

⚠️ **BUG**: This enum is NOT exported! `export enum TestType` is missing.

---

#### `sharedFiles/utils/urlHelper.util.ts`
**What it does**: Manages the base URL for the current test run.

```typescript
UrlHelper.setBaseUrl(url)              // sets the base URL
UrlHelper.baseUrl                      // gets the base URL
UrlHelper.getFullUrl(SwagLabsEndpoints.INVENTORY)  // → "https://saucedemo.com/inventory.html"
UrlHelper.validateUrl(endpoint, page)  // checks current page URL matches expected
```

**Why it's needed**: The `beforeEach` hook gets the base URL from `testInfo.project.use.baseURL` (which comes from `playwright.config.ts`) and stores it here. Then any test or page can use `UrlHelper.getFullUrl(endpoint)` to navigate.

---

### 📁 Swag Labs App (saucedemo.com)

---

#### `srcSwagLabs/utils/endpoints.util.ts`
```typescript
enum SwagLabsEndpoints {
  INVENTORY = "/inventory.html",
  CART = "/cart.html",
  // TODO: Add here all the endpoints
}
```
**TODO**: Add missing endpoints like `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html`

---

#### `srcSwagLabs/pages/loginPage.page.ts`
```typescript
export default class LoginPage extends BasePage {
  public readonly usernameInput: Locator;   // data-test="username"
  public readonly passwordInput: Locator;   // data-test="password"
  public readonly loginButton: Locator;     // data-test="login-button"
  public readonly errorMessage: Locator;    // data-test="error"
}
```
- Uses `page.getByTestId("username")` → finds elements with `data-test="username"` attribute
- This attribute name is configured in `playwright.config.ts` as `testIdAttribute: "data-test"`
- **✅ Complete** — all 4 important login page elements are defined

---

#### `srcSwagLabs/components/item.component.ts`
```typescript
export default class Item extends BaseComponent {
  constructor(page: Page) {
    super(page);
    // Nothing here yet!
  }
}
```
**Status**: Empty skeleton — needs locators for item name, price, "Add to Cart" button, etc.

---

#### `srcSwagLabs/fixtures/swagLabsFixtures.ts`
```typescript
type Pages = {
  loginPage: () => LoginPage;   // the fixture type
};

const baseTest = test.extend<Pages>({
  loginPage: lazyFixture(LoginPage),  // maps the fixture to LoginPage
});
```
**What it does**: Extends Playwright's `test` to include a `loginPage` fixture. Any test that uses `swagLabsTest` gets access to `loginPage()` automatically.

---

#### `srcSwagLabs/tests/setup/testLevelHooks.setup.ts`
```typescript
swagLabsTest.beforeEach(async ({ page }, testInfo) => {
  const baseUrl = testInfo.project.use.baseURL;
  UrlHelper.setBaseUrl(baseUrl);
  await page.goto(UrlHelper.baseUrl);   // navigates to saucedemo.com
});

swagLabsTest.afterEach(async ({ page }) => {
  await page.close();   // closes the browser tab
});
```
- **beforeEach**: Runs before EVERY test → opens the URL
- **afterEach**: Runs after EVERY test → closes the browser
- **✅ Complete**

---

#### `srcSwagLabs/tests/first.spec.ts` — ⚠️ NEEDS WORK
```typescript
import swagLabsTest from "./setup/testLevelHooks.setup";

enum Users {
  STANDARD_USER = "standard_user",
}

const loginTest = swagLabsTest.extend({});

loginTest(
  "Write here the name of the test",
  async ({ loginPage }): Promise<void> => {
    loginPage().usernameInput.fill(Users.STANDARD_USER);  // ⚠️ missing await!
  }
);
```

**Issues**:
1. `TODO: Change the file name` — rename to `login.spec.ts`
2. `loginPage().usernameInput.fill(...)` — `.fill()` is async, needs `await`
3. Test is incomplete — no password, no click, no assertion
4. Need more tests (wrong password, empty fields, etc.)

---

### 📁 React App (hub.testingtalks.com.au)

---

#### `srcReactApp/utils/endpoints.util.ts`
```typescript
enum ReactAppEndpoints {
  contacts = "/contacts",
  home = "/home",
  login = "/login",
  register = "/register"
}
```
**✅ Complete** — all main app routes are defined.

---

#### `srcReactApp/components/contact.component.ts`
```typescript
export default class Contact extends BaseComponent {
  private root: Locator;           // the container of ONE contact card
  
  // Locators (as getters):
  get name(): Locator              // .contact-name inside the card
  get deleteButton(): Locator      // button with text "Delete"
  get details(): Locator           // .contact-details inside the card
  
  // Methods:
  async getName(): Promise<string>  // reads the text of the name element
  async delete(): Promise<void>     // clicks the Delete button
}
```
**Key concept**: The `root` locator scopes all searches to ONE contact card.
- `this.root.locator('.contact-name')` → finds `.contact-name` INSIDE `root` only
- This prevents finding names from OTHER contact cards

**✅ Complete**

---

#### `srcReactApp/pages/contacts.page.ts`
This is the most complete and well-commented file in the project. It has:

| Method | Does What |
|---|---|
| `isSearchInputVisible()` | Returns `true` if search bar is on screen |
| `search(term)` | Types text into the search bar |
| `getContact(index)` | Returns Contact component at position 0, 1, 2... |
| `getContactsCount()` | Returns how many contacts are in the list |
| `getRandomContact()` | Returns a randomly chosen contact |
| `confirmDelete()` | Clicks the "Ok" confirmation button |
| `isContactInList(name)` | Searches all contacts for a specific name |

**✅ Complete** — and excellently documented for learning!

---

#### `srcReactApp/fixtures/reactAppFixtures.ts`
```typescript
type Pages = {
  contacts: () => Contacts;
};

const baseTest = test.extend<Pages>({
  contacts: lazyFixture(Contacts),
});
```
Makes `contacts()` available in all ReactApp tests.
**✅ Complete**

---

#### `srcReactApp/tests/setup/testLevelHooks.setup.ts`
Same pattern as SwagLabs — navigates to the React App URL before each test.
**✅ Complete**

---

#### `srcReactApp/tests/react_app.spec.ts` — 🐛 HAS BUGS
```typescript
import reactAppTest from "./setup/testLevelHooks.setup";
import { test, expect } from '@playwright/test';  // ← unused import!

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "add and delet contact",   // ← typo: "delet" should be "delete"
  async ({
    // ← contacts fixture is MISSING from destructuring!
  }): Promise<void> => {
    const firstContact = contacts().getContact(0);  // ← contacts is not in scope!
    const nameToSearch = await firstContact.getName();
    // rest of test is empty
  }
);

contactsListTest(
  "verify contact details",
  async ({ page }): Promise<void> => {       // ← contacts is missing!
    const secondContact = contacts().getContact(1);  // ← contacts not in scope!
    const secondContactName = await secondContact.getName();
    expect(secondContactName).toBeTruthy();
  }
);

function contacts() {             // ← This stub throws an error — wrong approach!
  throw new Error("Function not implemented.");
}
```

---

## 5. Design Patterns Used

### 🏗️ Page Object Model (POM)
- Every web page → its own class
- Class holds locators and methods
- Tests NEVER call `page.locator()` directly
- **Benefit**: If the UI changes, you fix it in ONE place

### 🧬 Inheritance (extends)
```
BasePage
  └── LoginPage         (SwagLabs login page)
  └── Contacts          (ReactApp contacts page)
  └── BaseComponent
        └── Item        (SwagLabs product item)
        └── Contact     (ReactApp contact card)
```

### 🏭 Factory Pattern (lazyFixture)
- `lazyFixture(LoginPage)` is a factory that creates `LoginPage` instances
- The test framework calls the factory; the test just uses the result

### 🔌 Fixture Pattern (Playwright)
- `test.extend<Pages>({...})` adds custom page objects to test parameters
- Tests receive page objects automatically through destructuring:
  ```typescript
  async ({ loginPage, contacts }) => { ... }
  ```

### 😴 Lazy Initialization
- Page objects are only created when first accessed
- `loginPage()` — calling as function triggers creation
- Avoids creating unnecessary objects

---

## 6. Bugs Found in the Project

### 🐛 Bug #1 — `react_app.spec.ts`: Fixture not destructured
**File**: `srcReactApp/tests/react_app.spec.ts`  
**Line**: 18–22 and 35

**Problem**: The `contacts` fixture is available (defined in `reactAppFixtures.ts`) but NOT added to the test function parameters.

```typescript
// ❌ BROKEN
async ({
  // contacts is missing!
}): Promise<void> => {
  const firstContact = contacts().getContact(0);  // ERROR: contacts is not defined
```

```typescript
// ✅ FIXED
async ({ contacts }): Promise<void> => {
  const firstContact = contacts().getContact(0);  // contacts is now available
```

---

### 🐛 Bug #2 — `react_app.spec.ts`: Wrong `contacts` function at bottom
**File**: `srcReactApp/tests/react_app.spec.ts`  
**Line**: 42–44

**Problem**: There's a local function `contacts()` that throws an error. This was a placeholder that should be removed now that the fixture exists.

```typescript
// ❌ REMOVE THIS
function contacts() {
  throw new Error("Function not implemented.");
}
```

---

### 🐛 Bug #3 — `react_app.spec.ts`: Unused import
**File**: `srcReactApp/tests/react_app.spec.ts`  
**Line**: 2

```typescript
// ❌ This import is not needed (reactAppTest already wraps Playwright test)
import { test, expect } from '@playwright/test';
```
`expect` is used in the second test though, so keep only that:
```typescript
import { expect } from '@playwright/test';
```

---

### 🐛 Bug #4 — `react_app.spec.ts`: Typo in test name
**Line**: 17  
`"add and delet contact"` → should be `"add and delete contact"`

---

### 🐛 Bug #5 — `first.spec.ts`: Missing `await` on async call
**File**: `srcSwagLabs/tests/first.spec.ts`  
**Line**: 24

```typescript
// ❌ BROKEN — .fill() is async but not awaited
loginPage().usernameInput.fill(Users.STANDARD_USER);

// ✅ FIXED
await loginPage().usernameInput.fill(Users.STANDARD_USER);
```

---

### 🐛 Bug #6 — `testTypes.util.ts`: Missing export
**File**: `sharedFiles/utils/testTypes.util.ts`

```typescript
// ❌ Not exported — can't be used in other files
enum TestType { ... }

// ✅ Fixed
export enum TestType { ... }
```

---

## 7. What Is Complete vs What Needs Work

| File | Status | Notes |
|---|---|---|
| `playwright.config.ts` | ✅ Complete | |
| `.env` | ✅ Complete | |
| `basePage.page.ts` | ✅ Complete | |
| `baseComponent.component.ts` | ✅ Complete | |
| `parseEnv.util.ts` | ✅ Complete | |
| `lazyFixture.util.ts` | ✅ Complete | |
| `urlHelper.util.ts` | ✅ Complete | |
| `testTypes.util.ts` | ⚠️ Missing export | Add `export` keyword |
| `srcSwagLabs/pages/loginPage.page.ts` | ✅ Complete | |
| `srcSwagLabs/components/item.component.ts` | ⚠️ Empty | Add locators for product items |
| `srcSwagLabs/fixtures/swagLabsFixtures.ts` | ✅ Complete | |
| `srcSwagLabs/tests/setup/testLevelHooks.setup.ts` | ✅ Complete | |
| `srcSwagLabs/utils/endpoints.util.ts` | ⚠️ Incomplete | Add more endpoints (TODO comment) |
| `srcSwagLabs/tests/first.spec.ts` | 🔴 Needs Work | Fix bugs, rename, add tests |
| `srcReactApp/pages/contacts.page.ts` | ✅ Complete | Well documented! |
| `srcReactApp/components/contact.component.ts` | ✅ Complete | |
| `srcReactApp/fixtures/reactAppFixtures.ts` | ✅ Complete | |
| `srcReactApp/tests/setup/testLevelHooks.setup.ts` | ✅ Complete | |
| `srcReactApp/utils/endpoints.util.ts` | ✅ Complete | |
| `srcReactApp/tests/react_app.spec.ts` | 🔴 Has Bugs | Fix 3 bugs, complete test steps |

---

## 8. Step-by-Step Fix Plan

### Step 1: Fix `testTypes.util.ts`
Open `sharedFiles/utils/testTypes.util.ts` and add `export`:
```typescript
export enum TestType {
  Regression = "@Regression",
  Smoke = "@Smoke",
  // ...
}
```

---

### Step 2: Fix `react_app.spec.ts` — Remove stub function & fix imports
```typescript
// 1. Change line 2 — only import expect, not test
import { expect } from '@playwright/test';

// 2. Fix first test — add contacts to parameters
contactsListTest(
  "add and delete contact",    // fixed typo
  async ({ contacts }): Promise<void> => {
    const firstContact = contacts().getContact(0);
    const nameToSearch = await firstContact.getName();
    // TODO: add test steps
  }
);

// 3. Fix second test — add contacts to parameters
contactsListTest(
  "verify contact details",
  async ({ contacts }): Promise<void> => {
    const secondContact = contacts().getContact(1);
    const secondContactName = await secondContact.getName();
    expect(secondContactName).toBeTruthy();
  }
);

// 4. DELETE this function at the bottom
// function contacts() { throw new Error("Function not implemented."); }
```

---

### Step 3: Complete the ReactApp "add and delete contact" test
Here is the complete test logic using the methods available in `contacts.page.ts`:

```typescript
contactsListTest(
  "add and delete contact @Smoke",
  async ({ contacts, page }): Promise<void> => {
    // Step 1: Verify search input is visible
    const isVisible = await contacts().isSearchInputVisible();
    expect(isVisible).toBe(true);

    // Step 2: Pick a random contact and get its name
    const randomContact = await contacts().getRandomContact();
    const nameToSearch = await randomContact.getName();

    // Step 3: Search for that contact
    await contacts().search(nameToSearch);

    // Step 4: Verify only 1 contact is shown
    const countAfterSearch = await contacts().getContactsCount();
    expect(countAfterSearch).toBe(1);

    // Step 5: Delete the contact
    // Option A: if the app uses a browser dialog
    page.once("dialog", async (dialog) => await dialog.accept());
    await contacts().getContact(0).delete();

    // Option B: if the app uses a UI popup button
    // await contacts().getContact(0).delete();
    // await contacts().confirmDelete();

    // Step 6: Clear the search
    await contacts().search("");

    // Step 7: Verify the deleted contact is no longer in the list
    const isStillInList = await contacts().isContactInList(nameToSearch);
    expect(isStillInList).toBe(false);
  }
);
```

---

### Step 4: Fix `first.spec.ts` (SwagLabs Login)
Rename to `login.spec.ts` and write these tests:

```typescript
import swagLabsTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";

enum Users {
  STANDARD_USER = "standard_user",
  LOCKED_OUT_USER = "locked_out_user",
}
const PASSWORD = "secret_sauce";

const loginTest = swagLabsTest.extend({});

// Test 1: Valid login
loginTest(
  "login with valid credentials @Smoke",
  async ({ loginPage }): Promise<void> => {
    await loginPage().usernameInput.fill(Users.STANDARD_USER);
    await loginPage().passwordInput.fill(PASSWORD);
    await loginPage().loginButton.click();
    // Verify we are on the inventory page
    await expect(loginPage().page).toHaveURL(/inventory/);
  }
);

// Test 2: Locked out user
loginTest(
  "login with locked out user @Negative",
  async ({ loginPage }): Promise<void> => {
    await loginPage().usernameInput.fill(Users.LOCKED_OUT_USER);
    await loginPage().passwordInput.fill(PASSWORD);
    await loginPage().loginButton.click();
    await expect(loginPage().errorMessage).toBeVisible();
  }
);

// Test 3: Empty credentials
loginTest(
  "login with empty credentials @Negative",
  async ({ loginPage }): Promise<void> => {
    await loginPage().loginButton.click();
    await expect(loginPage().errorMessage).toBeVisible();
  }
);
```

> ⚠️ Note: `loginPage().page` — the `page` property in `BasePage` is `protected`.
> To use it in tests, you either need to make it `public` in `BasePage`, or use Playwright's `expect(page)` from the test parameters instead.

---

## 9. Key TypeScript Concepts Used Here

### Classes & Inheritance
```typescript
// Parent class
abstract class BasePage {
  constructor(protected readonly page: Page) {}
}

// Child class
class LoginPage extends BasePage {  // "extends" = inherits from BasePage
  constructor(page: Page) {
    super(page);    // calls BasePage constructor, sets this.page
  }
}
```

### Abstract Classes
```typescript
abstract class BasePage { ... }
// Cannot do: new BasePage(page)  ← ERROR
// Can do:    new LoginPage(page) ← OK (LoginPage extends BasePage)
```

### Access Modifiers
| Modifier | Where can it be accessed? |
|---|---|
| `public` | Anywhere |
| `protected` | This class + child classes only |
| `private` | This class only |
| `readonly` | Can be read but never changed after construction |

### Enums
```typescript
enum Users {
  STANDARD_USER = "standard_user",   // Users.STANDARD_USER === "standard_user"
}
```

### Generics `<T>`
```typescript
function lazyFixture<T>(pageClass: new (page: Page) => T): ... {
  // T is replaced with LoginPage when you call lazyFixture(LoginPage)
  // T is replaced with Contacts when you call lazyFixture(Contacts)
}
```

### Async/Await
```typescript
// ❌ Without await — code runs BEFORE the browser does anything
loginPage().usernameInput.fill("hello");

// ✅ With await — waits for browser action to complete
await loginPage().usernameInput.fill("hello");
```

### Type Aliases
```typescript
type Pages = {
  loginPage: () => LoginPage;   // loginPage is a function that returns LoginPage
};
```

---

## 10. Running the Tests

### Prerequisites
1. Install dependencies: `npm install` (run from inside `Playwright-Training/` folder)
2. Install browsers: `npx playwright install`
3. Make sure `.env` file exists with the correct values

### Run All Tests
```bash
cd Playwright-Training
npx playwright test
```

### Run Only One Project
```bash
npx playwright test --project="swag labs"
npx playwright test --project="react app"
```

### Run Only Smoke Tests
```bash
npx playwright test --grep "@Smoke"
```

### Run a Specific File
```bash
npx playwright test srcSwagLabs/tests/login.spec.ts
```

### View the HTML Report
```bash
npx playwright show-report playwright-report
```

### Run in Headed Mode (see browser)
Make sure `HEADLESS = false` in `.env`, then:
```bash
npx playwright test
```

---

## 🎓 Summary for Your Exam

When asked **"explain your approach"**, here's your narrative:

1. **I started** by understanding the framework structure — it uses the **Page Object Model** design pattern, which separates the browser interaction code (pages/components) from the test logic.

2. **The inheritance chain** is: `BasePage → LoginPage / Contacts`, and `BasePage → BaseComponent → Item / Contact`. This means all page objects automatically get `this.page` (the Playwright browser tab).

3. **The fixture system** (in the `fixtures/` folders) uses Playwright's `test.extend()` to inject page objects into tests automatically. The `lazyFixture` utility ensures objects are only created when needed.

4. **The `.env` file** controls the test environment — URLs and browser mode — without hardcoding values in test files.

5. **I identified and fixed** three bugs in `react_app.spec.ts`: the `contacts` fixture was missing from test parameters, a broken stub function needed removal, and a missing `await` in the SwagLabs test.

6. **The tests I wrote** follow the existing patterns: use the fixture (`contacts()`), call methods on page objects (`search()`, `getContact()`, `getName()`), and assert with `expect()`.

---
*This guide was generated by Cline AI after reviewing every file in the Playwright-Training project.*

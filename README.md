# Playwright Automation

This project is for learning the fundamentals of Playwright in Typescript

## Getting started

clone the project to you desktop

then, install all the npm dependencies

```
npm i
```

## Important to know

under each src/setup folder, you will have the hooks file

it will contain two functions, one that run before each test, and one that runs after

once you run the tests, it will open the driver at the URL inserted there

and will close the page in the end

e.g

```
test.beforeEach(...)

test.afterEach(...)
```

## Running the tests

You have here two projects to run your tests on

Project for managing contacts, and playground elements

```
https://hub.testingtalks.com.au/
```

Project for buying cool products

```
https://www.saucedemo.com
```

Run the tests using the command

```
npx playwright test
```

Happy Coding :)

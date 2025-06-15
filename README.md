# Playwright Automation

This project is for learning the fundamentals of Playwright in Typescript

## Getting started

clone the project to you desktop

then, install all the npm dependencies

```
npm i
```

## Important to know

under src/setup folder, you will have the hooks file

it will contain two functions, one that run before each test, and one that runs after

once you run the tests, it will open the driver at the URL inserted there

and will close the driver in the end

e.g

```
test.beforeEach(...)

test.afterEach(...)
```

## Running the tests

### The system you run the tests on

before you run the tests, make sure that you have the wanted project to run on

you need to clone the following to your desktop

```
https://github.com/TestingTalks/react-app
```

install the project dependencies, using the following command

```
yarn i
```

and run the project using

```
yarn start
```

### Run the tests

after you cloned and ran the wanted project, run the tests with the following bat script

```
./run-tests.bat
```

validate the following:

- the driver opened at the URL: localhost:3000
- waited 3 seconds on the home page
- closed the driver

Happy Coding :)

# Test Angular App with Jest and Spectator :eyeglasses:

The purpose of this project is to demonstrate how to configure and use [Jest](https://jestjs.io/) with [Spectator](https://ngneat.github.io/spectator/) to write unit tests for an Angular app. The unit test examples are for components and services only. Tests for directives and pipes will come soon.

![](./images/jest-and-spectator.gif)

### Why Jest?
* It's fast, and focuses on simplicity.
* Aims to work out of the box.
* Supports snapshots which make tests that keep track of large objects simpler.
* Improves performance by running tests in parallel in their own processes.
* Has great API, which has its entire toolkit in one place. Well documented,  and well maintained.

### Why Spectator?
* Helps remove all boilerplate required to set up test suites.
* Helps write very clean, easy, and focused tests.
* Makes query DOM elements in tests easy.
* Provides HTTP testing support.
* Provides custom matchers, e.g. toHaveClass, toBeDisabled, etc.
* Provides routing testing support.
* Provides built-in support for entry components.
* Supports auto-mocking providers.

## Run App Locally :rocket:
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run Unit Tests :white_check_mark:
Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/) and [Spectator](https://ngneat.github.io/spectator/)

Run tests in watch mode:
```sh
npm run test:watch
```
You can also debug your tests by adding breakpoints to the code, e.g. running JavaScript Debug Terminal in VSCode as shown below:

![](./images/vs-code-javascript-debug-terminal.png)

## Run End-to-End Tests :white_check_mark:
Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/). (Coming soon...)


### Author :books:
[Ahmed Alatawi](https://github.com/AhmedAlatawi)

# jest-console-mock

Simple wrapper to mock (and unmock) `console.log`, `.warn`, `.error` calls

## What this does

When testing, I wanted a way of hiding logs which I was expecting, while allowing those which I wasn't expecting to still show.

This code mocks the requested `console`, when it is called the message is checked against the list of expected messages, if none match it calls `console.info` with the message.


## Usage

### `mockConsole(['messages'], 'log'|'warn'|'error')`

_index.js_
````js
  console.log('message1'); //expected
  console.log('message2'); //expected
  console.log('message3'); //unexpected
````

_spec.js_
````js
beforeAll(() => {
  mockConsole(['message1', 'message2'], 'log');
});

it('should do something', () => {
  ****
});
````

_output_
````zsh
should do something:
  console.info **/index.js:*
      message3
````

### `unmockConsole('log'|'warn'|'error')`

_index.js_
````js
  console.error('message1'); //expected
  console.error('message2'); //expected
  console.error('message3'); //unexpected
````

_spec.js_
````js
beforeAll(() => {
  mockConsole(['message1', 'message2'], 'error');
});

afterEach(() => {
  unmockConsole('error');
});

it('should do something', () => {
  ****
});
it('should do something else', () => {
  ****
});

````

_output_
````zsh
should do something:
  console.info **/index.js:*
      message3
      
should do something else:
  console.error **/index.js:*
      message1
  console.error **/index.js:*
      message2
  console.error **/index.js:*
      message3
````

### `unmockAllConsoles()`

_index.js_
````js
  console.log('message1'); //expected
  console.warn('message2'); //expected
  console.error('message3'); //expected
````

_spec.js_
````js
beforeAll(() => {
  mockConsole(['message1'], 'log');
  mockConsole(['message2'], 'warn');
  mockConsole(['message3'], 'error');
});

afterEach(() => {
  unmockAllConsoles();
});

it('should do something', () => {
  ****
});
it('should do something else', () => {
  ****
});

````

_output_
````zsh
should do something:
      
should do something else:
  console.log **/index.js:*
      message1
  console.warn **/index.js:*
      message2
  console.error **/index.js:*
      message3
````

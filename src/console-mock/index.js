const spies = {};

/* eslint-disable no-console */
const mockConsole = (messagesToIgnore, type) => {
  if (type === 'info') return;

  spies[type || 'log'] = jest.spyOn(global.console, type || 'log').mockImplementation((message) => {
    if (!messagesToIgnore || messagesToIgnore.includes(message)) return;
    console.info(message);
  });
};

const unmockConsole = (type) => {
  spies[type || 'log'].mockRestore();
};

const unmockAllConsoles = () => {
  Object.keys(spies).forEach((key) => {
    spies[key].mockRestore();
  });
};

module.exports = {
  mockConsole,
  unmockConsole,
  unmockAllConsoles,
};

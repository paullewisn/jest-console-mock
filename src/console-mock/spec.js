/* eslint-disable no-console */
const { mockConsole, unmockConsole, unmockAllConsoles } = require('.');

describe('console-mock', () => {
  describe('mockConsole', () => {
    afterEach(() => {
      unmockAllConsoles();
    });

    it('should not mock console.info', () => {
      mockConsole(['message'], 'info');

      expect(console.info.mock).not.toBeDefined();
    });

    ['log', 'warn', 'error'].forEach((type) => {
      it(`should mock console.${type}`, () => {
        mockConsole(['message'], type);

        expect(console[type].mock).toBeDefined();
      });

      it(`should call console.${type} mock with matching messages`, () => {
        mockConsole(['message1', 'message2'], type);

        console[type]('message1');
        console[type]('message2');

        expect(console[type].mock.calls[0][0]).toBe('message1');
        expect(console[type].mock.calls[1][0]).toBe('message2');
      });

      it('should call console.info mock with messages that don\'t match', () => {
        console.info = jest.fn();

        mockConsole(['matchingMessage'], type);

        console[type]('unMatchingMessage');

        expect(console.info).toBeCalledWith('unMatchingMessage');
      });
    });

    it('should default to console.log if no type is passed', () => {
      mockConsole(['message']);

      expect(console.log.mock).toBeDefined();
    });
  });

  describe('unmockConsole', () => {
    ['log', 'warn', 'error'].forEach((type) => {
      it(`should reset console.${type} mock`, () => {
        mockConsole(['message'], type);

        unmockConsole(type);

        expect(console[type].mock).not.toBeDefined();
      });
    });

    it('should reset console.log if no parameter is supplied', () => {
      mockConsole(['message']);

      unmockConsole();

      expect(console.log.mock).not.toBeDefined();
    });
  });

  describe('unmockAllConsoles', () => {
    it('should restore all consoles', () => {
      ['log', 'warn', 'error'].forEach((type) => {
        mockConsole(['message'], type);
      });

      unmockAllConsoles();

      ['log', 'warn', 'error'].forEach((type) => {
        expect(console[type].mock).not.toBeDefined();
      });
    });
  });
});

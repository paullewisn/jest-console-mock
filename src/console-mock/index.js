const mockConsole = (messagesToIgnore, type) => {
    if (type === 'info') return;

    console[type || 'log'] = jest.fn((message) => {
        if (!messagesToIgnore || messagesToIgnore.includes(message)) return;
        console.info(message);
    });
};

const unmockConsole = () => {
    ['log', 'warn', 'error'].forEach((type) => {
        console[type].mockRestore();
    });
};

module.exports = {
    mockConsole,
    unmockConsole,
};

function escape(functionCall, errorCallback) {
    try {
        functionCall();
    } catch (err) {
        errorCallback(err);
    }
}

module.exports = {
    escape
};
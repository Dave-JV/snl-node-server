export function escape(functionCall: () => void, errorCallback: (err: Error) => void) {
    try {
        functionCall();
    } catch (err) {
        errorCallback(err);
    }
}

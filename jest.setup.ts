import CustomMatcherResult = jest.CustomMatcherResult;

expect.extend({
    nilOrAny(received: any, expected: any): CustomMatcherResult {
        const receivedType = typeof received;
        let pass = received instanceof expected;

        if (null === received || undefined === received) {
            pass = true;
        } else {
            if (Number === expected) {
                pass = 'number' === receivedType || received instanceof Number;
            } else if (String === expected) {
                pass = 'string' === receivedType || received instanceof String;
            }
        }

        return {
            message: () => `expected null or undefined or instance of ${typeof expected} 
                and received ${'object' === receivedType ? 'null' : receivedType}`,
            pass,
        };
    },
});

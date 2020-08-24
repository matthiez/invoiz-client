import environment from './lib/environment';
import client from './lib/client';

describe('Auth related', () => {
    test('should return an access token', async () => {
        expect(environment.installationId).toBeInstanceOf(String);

        const accessToken = await client.authToken(environment.installationId!);

        expect(typeof accessToken).toBe('string');

        expect(accessToken).not.toEqual(null);
    });
});
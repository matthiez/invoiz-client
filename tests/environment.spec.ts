import environment, {Environment} from './lib/environment';

describe('Environment', () => {
    test('should have environment variables set', () => {
        expect(environment).toMatchObject<Environment>({
            accessToken: expect.nilOrAny(String),
            apiKey: expect.any(String),
            apiKeySecret: expect.any(String),
            installationId: expect.any(String),
        });
    });
});
import {ok} from 'assert';
import InvoizClient from '../../src';
import environment from './environment';

ok(environment.apiKey);
ok(environment.apiKeySecret);

const client = new InvoizClient({
    apiKey: environment.apiKey,
    apiKeySecret: environment.apiKeySecret,
    installationId: '',
});

if (environment.accessToken) {
    client.setAccessToken(environment.accessToken);
}

export default client;

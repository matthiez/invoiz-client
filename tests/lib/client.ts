import {InvoizClient} from '../../src';
import environment from './environment';

if (!environment.apiKey) {
    throw new Error('environment.apiKey is missing!');
}

if (!environment.apiKeySecret) {
    throw new Error('environment.apiKeySecret is missing!');
}

const client = new InvoizClient(environment.apiKey, environment.apiKeySecret);

if (environment.accessToken) {
    client.setAccessToken(environment.accessToken);
}

export default client;

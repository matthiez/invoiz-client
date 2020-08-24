const apiKey = process.env.INVOIZ_API_KEY;
const apiKeySecret = process.env.INVOIZ_API_KEY_SECRET;
const accessToken = process.env.INVOIZ_ACCESS_TOKEN;
const installationId = process.env.INVOIZ_INSTALLATION_ID;

export type Environment = {
    accessToken?: string
    apiKey?: string
    apiKeySecret?: string
    installationId?: string
}

const environment: Environment = {
    apiKeySecret,
    apiKey,
    accessToken,
    installationId
};

export default environment;
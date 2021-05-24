![invoiz Logo](https://www.invoiz.de/wp-content/uploads/2017/07/invoiz_600.png "invoiz")

# TypeScript API Client for the [invoiz.de](http://invoiz.de) API

## Installation

*Via NPM* `npm install invoiz-client`

*Via Yarn* `yarn add invoiz-client`

### Usage
```javascript
const InvoizClient = require('invoiz-client');
const client = new InvoizClient(
    process.env.INVOIZ_API_KEY, process.env.INVOIZ_API_KEY_SECRET);
client.invoices.paginated()
    .then(console.log)
    .then(console.error);
```


#### License
Please see [License File](LICENSE) for more information.

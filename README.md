![invoiz Logo](https://www.invoiz.de/wp-content/uploads/2017/07/invoiz_600.png "invoiz")

# TypeScript API Wrapper for the invoiz.de API

## Installation
<figure>
<figcaption>Via NPM</figcaption>

```npm install invoiz-client```
</figure>

<figure>
<figcaption>Via Yarn</figcaption>

```yarn add invoiz-client```
</figure>

### Usage
<figure>
<figcaption>JavaScript</figcaption>

```javascript
const InvoizClient = require('invoiz-client');
const client = new InvoizClient(process.env.INVOIZ_API_KEY, process.env.INVOIZ_API_KEY_SECRET);
client.getInvoices()
    .then(invoices => console.log(invoices))
    .then(error => console.error(error));
```
</figure>

<figure>
<figcaption>JavaScript</figcaption>

```javascript
import InvoizClient from 'invoiz-client';
const client = new InvoizClient(process.env.INVOIZ_API_KEY, process.env.INVOIZ_API_KEY_SECRET);
client.getInvoices()
    .then(invoices => console.log(invoices))
    .then(error => console.error(error));
```
</figure>

#### License
Please see [License File](LICENSE) for more information.

##### Need help?
You are more than welcome to contact us via [Sms77.io](https://www.sms77.io) in order to get assistance.

###### Brought to you by
![Sms77.io Logo](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77")
import Koa from 'koa';
import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import router from './routes/routes';

import sqlinjection from 'sql-injection';

const app = new Koa();
const port = process.env.PORT || 5000;

app
    .use(parser())
    .use(logger())
    .use(sqlinjection)
    .use(router.routes());

app.listen(port, () => console.log('Server is running on port:', port));

const rescue = require('express-rescue');
const app = require('./app');
require('dotenv').config();

const router = require('./routers');

const errorMiddleware = require('./middlewares/errorMiddleware');

app.use('/products', rescue(router.productsRouter));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

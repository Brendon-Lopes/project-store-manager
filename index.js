const app = require('./app');
require('dotenv').config();

const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

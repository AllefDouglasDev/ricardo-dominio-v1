const app = require('./src/server');

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running at http://localhost:${port}`));

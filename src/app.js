require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const databaseRouter = require("./routes/userRoutes");
const publicDirectory = path.join(__dirname, "../public");
const authorizationRoutes = require("./routes/authorization");
const orderRoutes = require('./routes/orderRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const recommendRoutes = require('./routes/recommendRoutes');
const  gptRoutes  = require('./routes/gptRoute')

//const modRewrite = require('connect-modrewrite');

const app = express();

/*app.use(modRewrite([
  '^/([^.]+)$ /$1.html'
]));*/
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectory));

app.use("/database", databaseRouter);
app.use("/auth", authorizationRoutes);
app.use('/orders', orderRoutes);
app.use('/sensor', sensorRoutes);
app.use('/recommend', recommendRoutes);
app.use('/sustain', gptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const app = require("./app");

//env variables
const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});

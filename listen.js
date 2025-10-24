const app = require("./app.js");

const PORT = 9090;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}...`);
    }
});
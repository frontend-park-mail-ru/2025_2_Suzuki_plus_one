const express = require("express");
const path = require("path");

const app = express();
app.set('view engine', 'hbs');

app.use(express.static(__dirname));

app.use("/", function(_, response){      
    response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000);
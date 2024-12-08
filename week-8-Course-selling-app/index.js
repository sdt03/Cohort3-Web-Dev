const express = require("express");
const app = express();
const { router } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
app.use(express.json());

app.use("/v1/user", router);
app.use("/v1/admin", adminRouter);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})

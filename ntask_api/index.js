const PORT = 3000;
const app = require("express")();

app.get("/", (req, res) => res.json({status: "NTask API"}));
app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));

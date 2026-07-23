import app from "./app.js";

const PORT = process.env.GATEWAY_PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); //  localhost:8000
});
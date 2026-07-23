import app from "./app.js";

const PORT = process.env.NOTES_SERVICE_PORT || 8082;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
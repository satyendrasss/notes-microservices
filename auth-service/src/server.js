import app from "./app.js";

const PORT = process.env.AUTH_SERVICE_PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // localhost:8081
});



// process.on("SIGINT", async () => {
//   console.log("\nShutting down...");
//   await disconnectDB();
//   server.close(() => process.exit(0));
// });

// process.on("SIGTERM", async () => {
//   await disconnectDB();
//   server.close(() => process.exit(0));
// });
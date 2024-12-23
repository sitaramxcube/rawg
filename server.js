const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Route: Home Page - Grid View of Games
    server.get("/", (req, res) => {
      const actualPage = "/";
      app.render(req, res, actualPage);
    });

    server.get("/games/:GameDetails", (req, res) => {
        const actualPage = "/games/"+req.params.GameDetails;
        app.render(req, res, actualPage);
    });

    // Route: Creators Page
    server.get("/creators", (req, res) => {
      const actualPage = "/creators";
      app.render(req, res, actualPage);
    });

    // Catch-all handler for any other route
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    // Start the server
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });

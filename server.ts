import "dotenv/config";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "build");

app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.WOO_HOST,
    pathRewrite: { "^/api": "" },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
      ).toString("base64")}`,
      "access-control-expose-headers": "X-WP-Total, X-WP-TotalPages, Link",
    },
    changeOrigin: true,
  })
);

app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({ build: require(BUILD_DIR) })
    : (req, res, next) => {
        purgeRequireCache();
        const requestHandler = createRequestHandler({
          build: require(BUILD_DIR),
          mode: MODE,
        });
        return requestHandler(req, res, next);
      }
);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  // require the built app so we're ready when the first request comes in
  require(BUILD_DIR);
  console.log(`✅ app ready: http://localhost:${port}`);
});

// const metricsPort = process.env.METRICS_PORT || 3001;

// metricsApp.listen(metricsPort, () => {
//   console.log(`✅ metrics ready: http://localhost:${metricsPort}/metrics`);
// });

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete require.cache[key];
    }
  }
}

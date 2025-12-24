import { Logger, nodeAdapter, createFileAdapter } from "./src/index.js";

const log = new Logger([nodeAdapter, createFileAdapter("server.log")]);

log.debug("Starting application");
log.info("User logged in");
log.warn("Low disk space");
log.error("Connection lost");

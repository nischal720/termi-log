import type { Server } from 'http';

/**
 * Starts the Termilog bridge HTTP server.
 * Receives log entries from frontend/remote adapters via POST /__termi_log__
 * and prints them to the terminal with color-coded output.
 *
 * @param port - Port to listen on. Defaults to 5000.
 * @returns The underlying Node.js HTTP Server instance.
 *
 * @example
 * ```js
 * // termilog-bridge.js (run this in a separate terminal)
 * import { startBridge } from 'termilog-js/bridge';
 * startBridge(5000);
 * ```
 */
export function startBridge(port?: number): Server;

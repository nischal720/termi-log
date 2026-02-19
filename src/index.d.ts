export interface LogEntry {
  time: string;
  type: 'debug' | 'info' | 'warn' | 'error';
  message: any;
}

export interface Adapter {
  write(entry: LogEntry): void;
}

export interface LoggerConfig {
  /** Minimum log level to output. Defaults to 'debug'. */
  level?: 'debug' | 'info' | 'warn' | 'error';
}

export class Logger {
  constructor(adapter: Adapter | Adapter[], config?: LoggerConfig);
  debug(message: any): void;
  info(message: any): void;
  warn(message: any): void;
  error(message: any): void;
  /** Returns a shallow copy of the log history array. */
  getHistory(): LogEntry[];
  /** Clears the in-memory log history. */
  clearHistory(): void;
}

export const nodeAdapter: Adapter;

export interface BrowserAdapterOptions {
  url?: string;
  port?: number;
  host?: string;
  protocol?: string;
  path?: string;
  /** Called when the fetch request to the bridge fails. */
  onError?: (err: Error, entry: LogEntry) => void;
}

export function createBrowserAdapter(options?: string | BrowserAdapterOptions): Adapter;

export interface RemoteAdapterOptions {
  url?: string;
  port?: number;
  host?: string;
  protocol?: string;
  path?: string;
  /** Called when the fetch request to the bridge fails. */
  onError?: (err: Error, entry: LogEntry) => void;
}

export function createRemoteAdapter(options?: number | string | RemoteAdapterOptions): Adapter;

export function createFileAdapter(path?: string): Adapter;

/**
 * Starts the Termilog bridge HTTP server that receives logs from
 * frontend/remote adapters and prints them to the terminal.
 * @param port - Port to listen on. Defaults to 5000.
 */
export function startBridge(port?: number): import('http').Server;

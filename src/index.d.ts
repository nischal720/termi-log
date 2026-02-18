export interface LogEntry {
  time: string;
  type: 'debug' | 'info' | 'warn' | 'error';
  message: any;
}

export interface Adapter {
  write(entry: LogEntry): void;
}

export interface LoggerConfig {
  level?: 'debug' | 'info' | 'warn' | 'error';
}

export class Logger {
  constructor(adapter: Adapter | Adapter[], config?: LoggerConfig);
  debug(message: any): void;
  info(message: any): void;
  warn(message: any): void;
  error(message: any): void;
}

export const nodeAdapter: Adapter;

export interface BrowserAdapterOptions {
  url?: string;
  port?: number;
  host?: string;
  protocol?: string;
  path?: string;
}

export function createBrowserAdapter(options?: string | BrowserAdapterOptions): Adapter;

export interface RemoteAdapterOptions {
  url?: string;
  port?: number;
  host?: string;
  protocol?: string;
  path?: string;
}

export function createRemoteAdapter(options?: number | string | RemoteAdapterOptions): Adapter;

export function createFileAdapter(path?: string): Adapter;

// Bridge server (from server/bridger.js but often imported via package root if exported)
// Note: In package.json exports, "./bridge" maps to "./server/bridger.js"
// Users importing from "termilog-js/bridge" will need a separate declaration or module augmentation
// But ensuring the main entry has types is the priority.

export default class Logger {
  constructor(adapter, config = {}) {
    this.adapter = Array.isArray(adapter) ? adapter : [adapter];
    this.levels = ["debug", "info", "warn", "error"];
    this.minLevel = config.level || "debug";
    this.history = [];
  }

  _allow(type) {
    return this.levels.indexOf(type) >= this.levels.indexOf(this.minLevel);
  }

  _emit(type, message) {
    if (!this._allow(type)) return;

    const entry = {
      time: new Date().toISOString(),
      type,
      message, // Objects stay as objects — adapters handle serialization
    };

    this.history.push(entry);
    this.adapter.forEach((a) => a.write(entry));
  }

  debug(message) {
    this._emit("debug", message);
  }
  info(message) {
    this._emit("info", message);
  }
  warn(message) {
    this._emit("warn", message);
  }
  error(message) {
    this._emit("error", message);
  }

  /** Return log history (useful for testing or inspection) */
  getHistory() {
    return [...this.history];
  }

  /** Clear log history */
  clearHistory() {
    this.history = [];
  }
}

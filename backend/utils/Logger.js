class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    Logger.instance = this;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[LOG - ${timestamp}]: ${message}`);
  }

  error(message) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR - ${timestamp}]: ${message}`);
  }
}

module.exports = new Logger(); // Exported as a Singleton instance

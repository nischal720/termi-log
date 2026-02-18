export default function createFileAdapter(path = "server.log") {
  let fsPromise = null;

  return {
    write({ time, type, message }) {
      // Only try to use fs if it's available (Node.js)
      if (
        typeof process !== "undefined" &&
        process.release &&
        process.release.name === "node"
      ) {
        if (!fsPromise) {
          fsPromise = import("fs");
        }

        fsPromise
          .then((fs) => {
            const line = `[${time}] [${type.toUpperCase()}]-> ${message}\n`;
            fs.appendFileSync(path, line);
          })
          .catch(() => {
            // Fail silently if fs cannot be imported or written to
          });
      }
    },
  };
}

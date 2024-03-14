const { spawn } = require("child_process");
const EventEmitter = require("events");

class PingEmitter extends EventEmitter {}
const pingEmitter = new PingEmitter();

function pingHost(host) {
  const ping = spawn("ping", [host]);

  ping.stdout.on("data", (data) => {
    const match = data.toString().match(/(\d+\.?\d*)ms/);
    if (match && match[1]) {
      pingEmitter.emit("ping", { ip: host, result: match[1] + " ms" });
    }
  });

  ping.stderr.on("data", (data) => {
    pingEmitter.emit("error", data.toString());
  });

  ping.on("close", () => {
    setTimeout(() => pingHost(host), 1000);
  });
}

module.exports = { pingHost, pingEmitter };

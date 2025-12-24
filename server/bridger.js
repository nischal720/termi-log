import express from "express";
import nodeAdapter from "../src/adapters/nodeAdapter.js";

const app = express();
app.use(express.json());

export function startBridge(port = 5000) {
  app.post("/__termi_log__", (req, res) => {
    nodeAdapter.write(req.body);
    res.sendStatus(204);
  });

  app.listen(port, () => {
    console.log(`Termilog bridge running on port ${port}`);
  });
}

import Logger from "./core/Logger.js";
import nodeAdapter from "./adapters/nodeAdapter.js";
import createBrowserAdapter from "./adapters/browserAdapter.js";
import createFileAdapter from "./adapters/fileAdapter.js";
import createRemoteAdapter from "./adapters/remoteAdapter.js";

export {
    Logger,
    nodeAdapter,
    createBrowserAdapter,
    createFileAdapter,
    createRemoteAdapter
};

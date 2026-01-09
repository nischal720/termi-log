import http from 'http';

export default function createRemoteAdapter(
    port = 5000,
    host = 'localhost'
) {
    return {
        write(entry) {
            const data = JSON.stringify(entry);

            const req = http.request({
                hostname: host,
                port: port,
                path: '/__termi_log__',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            });

            req.on('error', (error) => {
                // Silently fail if bridge is down? Or fallback to console?
                // Ideally silent to avoid crashing the app if logger is down.
                // Maybe a tiny debug log to stderr if users are debugging the logger itself.
            });

            req.write(data);
            req.end();
        }
    };
}

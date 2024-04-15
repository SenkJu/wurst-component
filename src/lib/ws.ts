const WS_BASE = `ws://localhost:15000`;

let ws: WebSocket;

function connect() {
    ws = new WebSocket(WS_BASE);

    ws.onclose = () => {
        console.log("[WS] Disconnected from server, attempting to reconnect...");
        setTimeout(() => {
            connect();
        }, 1000);
    };

    ws.onerror = (error) => {
        console.error("[WS] WebSocket error: ", error)
    };

    ws.onmessage = (event) => {
        const json = JSON.parse(event.data);
        const eventName = json.name;
        const eventData = json.event;

        if (listeners[eventName]) {
            for (const callback of listeners[eventName]) {
                callback(eventData);
            }
        }
    }
}

let listeners: {[name: string]: Function[]}  = {};

export function listen(eventName: string, callback: Function) {
    if (!listeners[eventName]) listeners[eventName] = [];

    listeners[eventName].push(callback)
}

// Send ping to server every 5 seconds
setInterval(() => {
    if (!ws) return;
    if (ws.readyState !== 1) return;

    ws.send(JSON.stringify({
        name: "ping",
        event: {}
    }));
}, 5000);

connect();

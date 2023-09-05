import { useEffect } from "preact/hooks";

function WebsocketHandler() {
  useEffect(() => {
    // TODO: parametrize host and port
    const ws = new WebSocket("ws://localhost:8000/ws");

    // Reload the page when the we receive a new message from the websocket
    ws.addEventListener("message", () => {
      self.location.reload();
    });

    // Close WebSocket connection when the page unloads.
    self.addEventListener("beforeunload", () => {
      ws.close();
    });

    // Clean up the WebSocket connection when the component unmounts.
    return () => ws.close();
  }, []);

  return <div></div>;
}

export default WebsocketHandler;

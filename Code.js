export default {
  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("WebSocket server running", { status: 200 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    handleSocket(server);

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
};

function handleSocket(socket) {
  socket.accept();

  socket.addEventListener("message", (event) => {
    socket.send("Reçu : " + event.data);
  });

  socket.addEventListener("close", () => {
    console.log("Client déconnecté");
  });
}

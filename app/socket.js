// client
import io from "socket.io-client";

// wrap in function "connect" return socket
function connect() {
  const socket = io("http://localhost:3000/");
  return socket;
}

export default connect;

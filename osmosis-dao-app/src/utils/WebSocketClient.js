// src/utils/WebSocketClient.js
class WebSocketClient {
    constructor(url) {
      this.url = url;
      this.ws = null;
    }
  
    connect() {
      this.ws = new WebSocket(this.url);
  
      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.ws.onmessage = (event) => {
        console.log('Received message:', event.data);
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }
  
    send(message) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not connected');
      }
    }
    disconnect() {
      if (this.ws) {
        this.ws.close();
        console.log('WebSocket disconnected');
      }
    }
  }
  
  export default WebSocketClient;
  
declare global {
  namespace SocketIO {
    interface Socket {
      currentChannel?: string;
    }
  }
}

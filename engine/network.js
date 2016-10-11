const EVENT_CLIENT_JOIN = 'CLIENT_JOIN';
const EVENT_MAP_RECIEVE = 'MAP_RECIEVE';
const EVENT_MAP_SEND = 'MAP_SEND';
const EVENT_ENTITY_LOCATION_CHANGE = 'ENTITY_LOCATION_CHANGE';
const EVENT_ENTITY_ADD = 'ENTITY_ADD';
const EVENT_SOCKET_ID = 'SOCKET_ID';

class NetworkInterface {
  /**
   * Create an interface for sending data over the internet
   * using Socket IO.
   * @param {string} url - URL of the game server.
   */
  constructor(url) {
    this.socketId = '';
    this.roomId = '';

    this.send = this.send.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.broadcast = this.broadcast.bind(this);

    this.socket = io.connect(url);
    this.subscribe(EVENT_SOCKET_ID, data => {
      this.socketId = data.socketId;
      this.roomId = data.roomId;

      this.broadcast(EVENT_CLIENT_JOIN, {});
    });
  }

  /**
   * Get the headers appended to each socket event.
   * @param {string} to - Either 'all' or a specific socket id.
   * @return {objects} headers
   */
  getHeaders(to) {
    return {
      from: this.socketId,
      to: to,
      room: this.roomId
    };
  }

  /**
   * Send an event to a specific client.
   * @param {string} name - Name of the event. Stick to standard names defined as constants in this file.
   * @param {object} data
   * @param {string} to - SocketID to send this data too.
   */
  send(name, data, to) {
    data._headers = this.getHeaders(to);
    this.socket.emit(name, data);
  }

  /**
   * Send an event to all clients in the game.
   * @param {string} name
   * @param {object} data
   */
  broadcast(name, data) {
    data._headers = this.getHeaders('all');
    this.socket.emit(name, data);
  }

  /**
   * Subscribe to incoming events.
   * @param {string} name - Name of the event. Stick to standard names defined as constants in this file.
   * @param {function} handler - Must be able to recieve a data parameter.
   */
  subscribe(name, handler) {
    this.socket.on(name, handler);
  }
}

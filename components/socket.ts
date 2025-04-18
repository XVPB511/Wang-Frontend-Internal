import { io } from "socket.io-client";

export const socket = io('https://75f8-1-46-31-219.ngrok-free.app/socket/all', {
      transports: ['websocket'],
      withCredentials: false,
    });
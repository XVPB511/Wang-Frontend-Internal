import { io } from "socket.io-client";

const URL = 'https://75f8-1-46-31-219.ngrok-free.app'

export const socket = io(URL +'/socket/all', {
      transports: ['websocket'],
      withCredentials: false,
    });


export const socketpart = io(URL +'/socket/part', {
      transports: ['websocket'],
      withCredentials: false,
    });
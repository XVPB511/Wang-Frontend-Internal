import { io } from "socket.io-client";

const URL = 'https://803f-1-46-31-219.ngrok-free.app'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsImlhdCI6MTc0NTAzMjM4MCwiZXhwIjoxNzQ1MDM1OTgwfQ.qtUo2xmHF8WQhqohnrHHUBkfdR84nmEoVTc_QLhC0ZU'

export const socket = io(URL +'/socket/all', {
      transports: ['websocket'],
      withCredentials: false,
      auth: {
        token: token
      }
    });


export const socketpart = io(URL +'/socket/part', {
      transports: ['websocket'],
      withCredentials: false,
      auth: {
        token: token
      }
    });
export const socketvat = io(URL +'/socket/vat', {
      transports: ['websocket'],
      withCredentials: false,
      auth: {
        token: token
      }
    });
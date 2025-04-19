import { io } from "socket.io-client";

const URL = 'http://localhost:3002';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsImlhdCI6MTc0NTA0ODAyMiwiZXhwIjoxNzQ1MDg0MDIyfQ.uheiup3-d-pYoB_t66qOBb0kABdF3UOUpEePPcTS0tI'

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
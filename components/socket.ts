import { io } from "socket.io-client";
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig();
const token = sessionStorage.getItem("token")
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsImlhdCI6MTc0NTI5Mzk3NiwiZXhwIjoxNzQ1MzI5OTc2fQ.9i4NU7q0nUDTVqxby8-N9wXjd9Y5NE6XDk8Q271MQ-Y"
console.log("token ", token)

const socketOptions = {
  transports: ['websocket'],
  withCredentials: false,
  auth: {
    token: token
  }
};

export const socket = io(config.public.apiBase + '/socket/all', socketOptions);
export const socketpart = io(config.public.apiBase + '/socket/part', socketOptions);
export const socketvat = io(config.public.apiBase + '/socket/vat', socketOptions);
export const socketprint = io(config.public.apiBase + '/invoice/print/:sh_running', {
  ...socketOptions,
  path: '/socket.io' // ใช้ path เฉพาะสำหรับ print
});
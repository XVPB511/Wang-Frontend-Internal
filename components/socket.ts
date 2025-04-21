import { io } from "socket.io-client";

const URL = 'https://148a-2001-fb1-12f-333c-189d-e461-330-fb15.ngrok-free.app';
// const token = sessionStorage.getItem("token")
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsImlhdCI6MTc0NTA1NTUxNCwiZXhwIjoxNzQ1MDkxNTE0fQ.5lzhlixa7LxxCminN3Ar5gU8y6L7J0N0LAgjXW2VowU"
console.log("token ", token)

const socketOptions = {
  transports: ['websocket'],
  withCredentials: false,
  auth: {
    token: token
  }
};

export const socket = io(URL + '/socket/all', socketOptions);
export const socketpart = io(URL + '/socket/part', socketOptions);
export const socketvat = io(URL + '/socket/vat', socketOptions);
export const socketprint = io(URL + '/invoice/print/:sh_running', {
  ...socketOptions,
  path: '/socket.io' // ใช้ path เฉพาะสำหรับ print
});
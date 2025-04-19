import { io } from "socket.io-client";

const URL = 'https://559c-2001-fb1-12f-333c-189d-e461-330-fb15.ngrok-free.app';
const token = sessionStorage.getItem("token")
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
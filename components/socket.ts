import { io } from "socket.io-client";
import { useRuntimeConfig } from '#imports'

// const config = useRuntimeConfig();
const token = process.client ? sessionStorage.getItem("token") : null;

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsImlhdCI6MTc0NTQ2Mzg2NCwiZXhwIjoxNzQ1NDk5ODY0fQ.nUzofjrk2XQ8Kw4Yxiwet_Oikmcer0bvpnKKzo6tf34"
// console.log("token ", token)

const socketOptions = {
  transports: ['websocket'],
  withCredentials: false,
  auth: {
    token: token
  }
};

export const createSockets = () => {
  const config = useRuntimeConfig();


  console.log('Log env: ',config.public.apiBaseLogin)
  console.log('Log env: ',config.public.apiBaseInvoice)


  return {
    socket: io(config.public.apiBaseInvoice + '/socket/all', socketOptions),
    socketpart: io(config.public.apiBaseInvoice + '/socket/part', socketOptions),
    socketvat: io(config.public.apiBaseInvoice + '/socket/vat', socketOptions),
    socketprint: io(config.public.apiBaseInvoice + '/invoice/print/:sh_running', {
      ...socketOptions,
      path: '/socket.io'
    }),
    socketlistorder: io(config.public.apiBaseInvoice + '/socket/listorder', socketOptions),
    socketlistproduct: io(config.public.apiBaseInvoice + '/socket/listproducts', socketOptions),
    socketprintTicket: io(config.public.apiBaseInvoice + '/socket/ticket',socketOptions),

  };
  };

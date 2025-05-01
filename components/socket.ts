import { io } from "socket.io-client";
import { useRuntimeConfig } from '#imports'
// import { useNuxtApp } from '#app';


export const createSockets = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    // Only run on client
    sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImFsaWNlYnJvd24zNDUiLCJlbXBfY29kZSI6IkVNUDAwNiIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMjlUMTE6MDA6NTAuMDMyWiIsImlhdCI6MTc0NjA2ODU4NSwiZXhwIjoxNzQ2MTA0NTg1fQ.LKC173YNjcwU0iZJ79faH4irkBJLBWh4RSqPKWlOGkg'); // <- your real token
    token = sessionStorage.getItem('token');
    console.log("token", token);
  }

  const socketOptions = {
    transports: ['websocket'],
    withCredentials: false,
    auth: {
      token: token
    }
  };

  console.log('Log env: ', config.public.apiBaseLogin);
  console.log('Log env: ', config.public.apiBaseInvoice);

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
    socketprintTicket: io(config.public.apiBaseInvoice + '/socket/ticket', socketOptions),
  };
};
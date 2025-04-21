<script setup>
import { socket } from "../components/socket";

const isConnected = ref(false);
const transport = ref("N/A");

const offset = 0;
const limit = 10;

if (socket.connected) {
  onConnect();
}

function onConnect() {
   console.log("onConnect")
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
    console.log("ondisConnect")
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});
function print(){
    socket.emit('invoice:get', { offset, limit })
}
socket.on('invoice:list', (data) => {
  console.log(data)
})

</script>

<template>
<div>
  <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
  <p>Transport: {{ transport }}</p>
  <button @click="print">Connect</button>
</div>
</template>

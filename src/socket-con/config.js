import io from 'socket.io-client';
const socket = io('https://le-18262636.bitzonte.com/', {
    path: '/stocks'
  })
export default socket;
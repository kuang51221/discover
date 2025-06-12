const serverUrl = 'wss://ws.ifelse.io'; // Change to your echo server if needed
const ws = new WebSocket(serverUrl);
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');

function log(msg) {
  messagesDiv.innerHTML += `<div>${msg}</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

ws.onopen = () => log('Connected to ' + serverUrl);
ws.onclose = () => log('Connection closed.');
ws.onerror = (err) => log('WebSocket error: ' + err.message);

ws.onmessage = (event) => log('Received: ' + event.data);

sendBtn.onclick = () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(input.value);
    log('Sent: ' + input.value);
    input.value = '';
  } else {
    log('WebSocket not connected.');
  }
};

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

import http from 'http';
import express from 'express';
import path from 'path';
import qrcode from 'qrcode';
import { Server } from 'socket.io';

import client from './whatsapp-web';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')));

let status: string | undefined = undefined;

io.on('connection', function (socket) {
  if (!status) {
    // Avoid adding new listeners every time the browser refreshes
    status = 'started';

    console.log('Conexão iniciada');
    socket.emit('message', 'Conexão iniciada');
    socket.emit('qr', './icon.svg');

    client.on('qr', (qr) => {
      status = 'qr';
      console.log('QRCode recebido');
      qrcode.toDataURL(qr, (err, url) => {
        socket.emit('qr', url);
        socket.emit(
          'message',
          'QRCode recebido, aponte a câmera  seu celular!',
        );
      });
    });

    client.on('ready', () => {
      status = 'ready';
      socket.emit('ready', 'Dispositivo pronto!');
      socket.emit('message', 'Dispositivo pronto!');
      socket.emit('qr', './check.svg');
      console.log('Dispositivo pronto');
    });

    client.on('authenticated', () => {
      status = 'authenticated';
      socket.emit('authenticated', 'Autenticado!');
      socket.emit('message', 'Autenticado!');
      console.log('Autenticado');
    });

    client.on('auth_failure', function () {
      status = 'auth_failure';
      socket.emit('message', 'Falha na autenticação, reiniciando...');
      console.error('Falha na autenticação');
    });

    client.on('change_state', (state) => {
      status = 'change_state';
      console.log('Status de conexão: ', state);
    });

    client.on('disconnected', (reason) => {
      status = 'disconnected';
      socket.emit('message', 'Cliente desconectado!');
      console.log('Cliente desconectado', reason);
      client.initialize();
    });
    //
  } else if (status === 'ready') {
    socket.emit('ready', 'Dispositivo pronto!');
    socket.emit('message', 'Dispositivo pronto!');
    socket.emit('qr', './check.svg');
    console.log('Dispositivo pronto');
    //
  } else {
    socket.emit('message', 'Aguardando login no whatsapp...');
  }
});

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

import { Client, LocalAuth } from 'whatsapp-web.js';
import onMessage from './events/onMessage';

// WhatsApp Puppeteer Client
const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'post-gpt' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu',
    ],
  },
});

client.on('message', (msg) => onMessage(msg, client));

client.initialize();

export default client;

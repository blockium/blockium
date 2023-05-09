FROM docker.io/node:gallium-alpine

# Install full Chromium
RUN apk add chromium

# Does not need the Puppeteer Chromium installation
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENV HOST=0.0.0.0
ENV PORT=8000
ENV POST_GPT_URL='https://us-central1-post-gpt.cloudfunctions.net/chatgpt'
ENV LOGIN_URL='https://us-central1-post-gpt.cloudfunctions.net/login'

WORKDIR /app

RUN addgroup --system zapgateway && \
    adduser --system -G zapgateway zapgateway

COPY . zapgateway
RUN chown -R zapgateway:zapgateway .

RUN npm i --prefix zapgateway --omit=dev --only=production

EXPOSE 8000
CMD [ "node", "zapgateway" ]

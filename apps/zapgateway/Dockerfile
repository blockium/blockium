FROM docker.io/node:lts-alpine

RUN apk add chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENV HOST=0.0.0.0
ENV PORT=8000

WORKDIR /app

RUN addgroup --system zapgateway && \
          adduser --system -G zapgateway zapgateway

COPY dist/apps/zapgateway zapgateway
RUN chown -R zapgateway:zapgateway .

RUN npm ci --prefix zapgateway --omit=dev --only=production

EXPOSE 8000
CMD [ "node", "zapgateway" ]

# Use the official Node.js Alpine image as the base image
FROM node:20-alpine

# Install necessary packages and Chromium
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium \
    nss \
    libnss3 \
    libnspr4 \
    freetype \
    ca-certificates \
    nodejs \
    harfbuzz \
    alsa-lib \
    cairo \
    gdk-pixbuf \
    pango \
    gjs \
    libx11 \
    libxcomposite \
    libxdamage \
    libxrandr \
    libxtst \
    libxss \
    libxxf86vm \
    libgbm \
    mesa-gl \
    libevent \
    dbus \
    libgl \
    yarn \
    --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Set the working directory
WORKDIR /var/lib/volumes/gcs/gcs-zenix_wa

# Set environment variables
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" \
    NODE_ENV="production"
RUN yarn add puppeteer@13.5.0
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production --ignore-scripts --workspaces

# Copy the rest of the source code to the working directory
COPY . .

# Expose the port the API will run on
EXPOSE 8080

# Install gsutil
RUN apk update && apk add --no-cache gsutil

# Start the API
CMD ["npm", "start"]

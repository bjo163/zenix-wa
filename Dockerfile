# Use the official Node.js Alpine image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install Chromium and dependencies
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" \
    NODE_ENV="production"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium \  
    nss \
    freetype \
    harfbuzz \
    libx11 \
    libxcomposite \
    libxdamage \
    libxrandr \
    libxtst \
    libnss3 \
    adduser -h /app -D puppeteer

# Copy package.json and package-lock.json to the working directory
USER puppeteer
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production --ignore-scripts

# Copy the rest of the source code to the working directory
COPY . .

# Expose the port the API will run on
EXPOSE 3000

# Start the API
CMD ["npm", "start"]

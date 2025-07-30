# Use a Node 20 base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (instead of npm ci)
RUN npm install

# Build the React app
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Start the Node server
CMD ["node", "server.js"]

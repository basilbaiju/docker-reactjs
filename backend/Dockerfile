# Use official Node.js image as the base image
FROM node:16

# Set working directory inside container
WORKDIR /usr/src/app

# Copy the backend package.json and package-lock.json (if exists) to the working directory
COPY backend/package.json backend/package-lock.json* /usr/src/app/

# Install dependencies using npm ci for clean install (if package-lock.json exists)
RUN npm ci

# Copy the rest of the backend code
COPY backend/ /usr/src/app/

# Expose the backend port (5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

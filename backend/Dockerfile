# Use official Node.js image as the base image
FROM node:16

# Set working directory inside container
WORKDIR /usr/src/app

# Copy the backend package.json and install dependencies
COPY backend/package.json /usr/src/app/
RUN npm install

# Copy the rest of the backend code
COPY backend/ /usr/src/app/

# Expose the backend port (5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

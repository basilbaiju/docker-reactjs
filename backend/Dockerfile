# Use official Node.js image as the base image
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy the backend package.json and package-lock.json files
COPY backend/package.json /usr/src/app/
COPY backend/package-lock.json /usr/src/app/


# Install dependencies (add connect-redis and redis)
RUN npm install connect-redis redis

# Copy the rest of the backend code
COPY backend/ /usr/src/app/

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

# Use an official Node.js runtime as a parent image (LTS version)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# Use wildcard to copy both if they exist
COPY package*.json ./

# Install app dependencies
# Using ci is generally recommended for reproducible builds
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define the command to run your app using node
CMD [ "node", "server.js" ]

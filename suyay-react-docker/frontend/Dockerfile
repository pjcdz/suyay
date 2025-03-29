# Use an official Node.js runtime as a parent image (LTS version)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
# Using ci is generally recommended for reproducible builds
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 5173 available (Vite default port)
EXPOSE 5173

# Define the command to run the Vite dev server
# Use --host to ensure it's accessible from outside the container
CMD [ "npm", "run", "dev", "--", "--host" ]

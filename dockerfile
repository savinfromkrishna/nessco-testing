# Use the official Node.js image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8890

# Start the application
CMD ["npm", "run", "dev"]

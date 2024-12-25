# Stage 1: Build Stage
FROM node:18-slim AS builder
# Set the working directory
WORKDIR /src
# Copy package files and install dependencies
COPY package*.json ./ 
RUN npm install --legacy-peer-deps
COPY next.config.mjs ./   
# Copy the rest of the application code
COPY . .
# Build the Next.js application
RUN npm run build
# Stage 2: Production Stage
FROM node:18-slim
# Set environment to production
ENV NODE_ENV=production
# Allow specifying the port dynamically
ENV PORT=8890
# Set the working directory
WORKDIR /src
# Copy only necessary files from the builder stage
COPY --from=builder /src/.next ./.next
COPY --from=builder /src/public ./public
COPY --from=builder /src/package.json ./package.json
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/next.config.mjs ./  
# Expose the application port
EXPOSE 8890

# Use the correct production start command
CMD ["npm", "run", "start:prod"]

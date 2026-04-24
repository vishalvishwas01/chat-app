# Use official Node image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .


# Build NestJS app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
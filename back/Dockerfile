# Use Node.js as the base image
FROM node:23.3.0

# Create a new user with a specific UID
RUN useradd -ms /bin/bash -u 2000 appuser

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set the default user
USER appuser

# Start the application
CMD ["npm", "start"]

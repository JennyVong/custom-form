# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application code
COPY . ./

# Expose the development server port
EXPOSE 3000

# Start the frontend
ENTRYPOINT ["yarn", "dev"]

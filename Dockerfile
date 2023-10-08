# Use an official Node.js runtime as the base image
FROM node:18

USER node

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY  package*.json yarn.lock ./

# Install application dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY  . .

# Expose the port your application listens on (e.g., 3000)
EXPOSE 3000

# Start your Nest.js application
CMD ["yarn", "start:dev"]

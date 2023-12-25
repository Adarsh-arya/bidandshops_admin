FROM node:18-alpine

RUN npm install -g npm@10.2.5

RUN apk add --no-cache python3 make g++

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port Next.js is running on
EXPOSE 3000

# Set environment variables if necessary (for example, to change the Node environment)
# ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "run", "dev"]

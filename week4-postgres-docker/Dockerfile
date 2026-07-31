# Start from a lightweight Node.js environment                              
FROM node:24-alpine

# Create a working directory inside the container                                
WORKDIR /app

# Copy your package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port 3000 and start the app
EXPOSE 3000
CMD ["npm", "run", "start"] 
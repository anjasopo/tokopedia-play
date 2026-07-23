FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev && npm install typescript -g

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (Render/Koyeb/HuggingFace will route to this)
EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]

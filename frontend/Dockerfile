FROM node

# TODO: fix [plugin:vite:css] [postcss] Cannot read properties of undefined (reading 'toLowerCase') /app/src/index.css
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

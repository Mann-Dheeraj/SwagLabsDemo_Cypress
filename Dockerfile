FROM cypress/included:14.3.3

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "cypress", "run"] 
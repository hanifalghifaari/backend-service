FROM node:16
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=8080
ENV MODEL_URL="https://storage.googleapis.com/model-prediction-ml/model.json"
ENV PROJECT_ID="submissionmlgc-hanif-443407"
EXPOSE 8080 

CMD [ "npm", "start" ]
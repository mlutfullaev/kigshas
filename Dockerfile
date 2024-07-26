# Используйте последний Node.js 18 LTS в качестве базового образа
FROM node:18

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json (если он есть)
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы приложения
COPY . .

# Откройте порт 80
EXPOSE 5173

# Запуск Vite сервера разработки
CMD ["npm", "run", "dev"]
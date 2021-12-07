
### Integration of Django and React
### Django serve the backend api, and frontend base index.html which imediately taken over and rendered by React 
```
django-admin startproject market_recap

cd market_recap
python manage.py startapp api
python manage.py startapp frontend # one can also use : 'npx create-react-app frontend' , to build a full isolated react app. and run: 'npm start' to start the server

python manage.py makemigrations
python manage.py migrate

.\myprojvenv\Scripts\activate
python manage.py runserver

cd frontend
npm init -y #create react app at current directory

npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @material-ui/core
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @material-ui/icons
npm install axios
npm install react-table


npm run dev   # this refer to package.json.script
```
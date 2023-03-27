
flask --app app.py --debug run

gunicorn --bind 0.0.0.0:5000 wsgi:app

curl -d '{"operation":"capitalize", "data":"this is data"}' -H 'Content-Type: application/json' http://0.0.0.0:5000/transform

curl -d '{"operation":"remove_leading_space", "data":"   this is data"}' -H 'Content-Type: application/json' http://0.0.0.0:5000/transform
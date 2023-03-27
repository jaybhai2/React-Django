from flask import Flask, request, render_template, jsonify
import requests
import json
from transformer import Transformer
from flask_cors import CORS


app = Flask(__name__)

# white list local host domain, 
# or under specific route, add response.headers.add('Access-Control-Allow-Origin', '*')
CORS(app, origins=['http://localhost:3000'])

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/echo', methods=['POST'])
def echo():
    data = request.get_json() # assuming data is being sent as JSON
    # process the data here
    response = jsonify(data)
    
    return response


@app.route('/transform', methods=['POST'])
def transform():
    '''
    data = {'operation':'capitalize', 'data':'this is data'}
    '''
    data = request.get_json() # assuming data is being sent as JSON
    
    operation = getattr(Transformer, data['operation'])
    print(data)
    data['data'] = operation(data['data'])
    print(data)
    # process the data here
    return jsonify(data)

@app.route('/movie')
def movieapp():
   url = "http://movie-quotes-2.herokuapp.com/api/v1/quotes/random"   
   response = {'film':'this film', 'content':'this content'} #requests.get(url).json()
 
   return render_template("index.html", film=response['film'], quote=response['content'])
 

if __name__ == '__main__':
    app.run()

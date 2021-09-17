from flask import Flask , request, jsonify , make_response
from flask_restful import Resource, Api
import json    # 이게 있어야 json화 가능하다.
import urllib.request
import requests
client_id = "ObPbDdRqHkZOWzsTKKh2"
client_secret = "21QvWSx6rZ"


def searchFunction():
    encText = urllib.parse.quote('노제')
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText  # json 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request)  # 요청을 받았어
    rescode = response.getcode()

    if (rescode == 200):
        response_body = response.read()
        res = response_body.decode('utf-8')
        return res
    else:
        print("Error Code:" + rescode)

def make_response():
    url = "http://localhost:5001/data"
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)  # 요청을 받았어
    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
        res = response_body.decode('utf-8')
        return res
    else:
        print("Error Code:" + rescode)

app = Flask(__name__)
api = Api(app)
app.config['JSON_AS_ASCII'] = False

class GetApi(Resource):
    def get(self):
        data = requests.get("http://localhost:5001/data").json()  # 이 방식으로 다른 서버에서 요청을 받아올수 있다.
        return data;
       
   # NUGU 스피커 쪽에서 보내주는 POST 요청을 처리하는 로직      
    class Getparams(Resource):
    def post(self):
        data = request.get_json()
        print(data)
   # NUGU 스피커 쪽에 줘야하는 response 양식 수정후 이 방식으로 다시 보내주면 된다.      
    return jsonify(response)
        

api.add_resource(GetApi,'/')

if __name__ == "__main__":
    app.run(debug=True)


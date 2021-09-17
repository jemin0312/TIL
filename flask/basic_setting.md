```python
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):        // get method 구현하는 법 
    def get(self):
        return {'hello':'world'}

api.add_resource(HelloWorld,'/')    // 경로 지정 

if __name__ == '__main__':
    app.run(debug=True)
```

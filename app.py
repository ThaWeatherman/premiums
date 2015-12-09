from flask import Flask
from flask import render_template
from flask_restful import Resource, Api, reqparse


app = Flask(__name__)
api = Api(app)


class Calculation(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('oz', type=float, required=True, help='Weight in troy ounces')
    parser.add_argument('price', type=float, required=True, help='Price of the target item')
    parser.add_argument('spot', type=float, required=True, help='Spot price at time of purchase')


class Over(Calculation):
    def post(self):
        args = self.parser.parse_args()
        val = ((args['price'] / args['oz']) - args['spot']) * args['oz'] if args['oz'] < 1 else (args['price'] / args['oz']) - args['spot']
        return {'result': '%.2f'%val}


class Premium(Calculation):
    def post(self):
        args = self.parser.parse_args()
        val = (((args['price'] / args['oz']) - args['spot']) / args['spot']) * 100
        return {'result': '%.2f'%val}


class ToOunces(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('grams', type=float, required=True, help='Grams to troy ounces')

    def post(self):
        args = self.parser.parse_args()
        return {'oz': args['grams'] * 0.032151}


class ToGrams(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('oz', type=float, required=True, help='Troy ounces to grams')

    def post(self):
        args = self.parser.parse_args()
        return {'grams': args['oz'] * 31.1035}


api.add_resource(Over, '/api/over')
api.add_resource(Premium, '/api/premium')
api.add_resource(ToOunces, '/api/to_ounces')
api.add_resource(ToGrams, '/api/to_grams')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api')
def api():
    return render_template('api.html')


if __name__ == '__main__':
    app.run(debug=True)


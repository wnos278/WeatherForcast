from flask import Flask, jsonify, request
import datetime

app = Flask(__name__)

@app.route('/weather', methods=['GET'])
def get_weather():
    weather_data = {
        "coord": {
            "lon": request.args.get('lon', 0),
            "lat": request.args.get('lat', 0)
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 282.55,
            "feels_like": 281.86,
            "temp_min": 280.37,
            "temp_max": 284.26,
            "pressure": 1023,
            "humidity": 100
        },
        "visibility": 10000,
        "wind": {
            "speed": 1.5,
            "deg": 350
        },
        "clouds": {
            "all": 1
        },
        "dt": int(datetime.datetime.utcnow().timestamp()),
        "sys": {
            "type": 1,
            "id": 1414,
            "country": "GB",
            "sunrise": 1560343627,
            "sunset": 1560396563
        },
        "timezone": 0,
        "id": 2643743,
        "name": "London",
        "cod": 200
    }
    return jsonify(weather_data)

@app.route('/forecast', methods=['GET'])
def get_forecast():
    forecast_data = {
        "city": {
            "id": 2643743,
            "name": "London",
            "coord": {
                "lat": request.args.get('lat', 51.51),
                "lon": request.args.get('lon', -0.13)
            },
            "country": "GB",
            "timezone": 0
        },
        "list": [
            {
                "dt": int(datetime.datetime.utcnow().timestamp()),
                "main": {
                    "temp": 282.55,
                    "feels_like": 281.86,
                    "temp_min": 280.37,
                    "temp_max": 284.26,
                    "pressure": 1023,
                    "humidity": 100
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01d"
                    }
                ],
                "clouds": {
                    "all": 1
                },
                "wind": {
                    "speed": 1.5,
                    "deg": 350
                },
                "visibility": 10000,
                "pop": 0,
                "dt_txt": "2024-08-06 12:00:00"
            }
            for _ in range(40)  # Simulate 40 forecast entries
        ]
    }
    return jsonify(forecast_data)

if __name__ == '__main__':
    app.run(debug=True)

import requests

def test_api():
    origin = "SampleOrigin"
    destination = "SampleDestination"
    date = "2023-01-01"
    flight_class = "Economy"
    
    url = f"http://localhost:5000/api/flights?origin={origin}&destination={destination}&date={date}&class={flight_class}"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        print("API Response:", data)
    else:
        print("Failed to fetch data:", response.status_code)

if __name__ == "__main__":
    test_api()

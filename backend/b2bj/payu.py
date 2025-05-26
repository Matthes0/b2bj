import os

import requests
from dotenv import load_dotenv

load_dotenv()

PAYU_POS_ID = os.getenv('PAYU_POS_ID')
PAYU_CLIENT_ID = os.getenv('PAYU_CLIENT_ID')
PAYU_CLIENT_SECRET = os.getenv('PAYU_CLIENT_SECRET')
PAYU_SECOND_KEY = os.getenv('PAYU_SECOND_KEY')

PAYU_AUTH_URL = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize'
PAYU_ORDER_URL = 'https://secure.snd.payu.com/api/v2_1/orders'


def get_access_token():
    client_id = os.getenv("PAYU_CLIENT_ID")
    client_secret = os.getenv("PAYU_CLIENT_SECRET")

    auth_data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    try:
        response = requests.post(PAYU_AUTH_URL, data=auth_data, headers=headers)
        response.raise_for_status()
        return response.json()['access_token']
    except Exception as e:
        print(f"Error getting access token: {str(e)}")
        print(f"Response: {response.text if 'response' in locals() else 'No response'}")
        raise



def create_order(access_token, order_data):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}',
    }
    try:
        print("Request headers:", headers)
        print("Request JSON:", order_data)

        response = requests.post(PAYU_ORDER_URL, json=order_data, headers=headers, allow_redirects=False)

        print("PayU response status:", response.status_code)
        print("PayU response headers:", response.headers)

        response.raise_for_status()

        content_type = response.headers.get('Content-Type', '')
        if 'application/json' in content_type:
            response_data = response.json()
            if 'redirectUri' in response_data:
                return response_data['redirectUri']
            elif response_data.get('status', {}).get('statusCode') == 'SUCCESS' and 'redirectUri' in response_data['status']:
                return response_data['status']['redirectUri']
            else:
                raise ValueError(f"Unexpected PayU response JSON structure: {response_data}")
        else:
            raise ValueError(f"Unexpected content type: {content_type}. Response: {response.text[:500]}")

    except requests.exceptions.RequestException as e:
        error_msg = f"Order request failed: {e}"
        if e.response is not None:
            error_msg += f"\nStatus: {e.response.status_code}\nResponse: {e.response.text[:500]}"
        raise Exception(error_msg)
    except Exception as e:
        raise Exception(f"Unexpected error: {e}")
import requests

# Replace with your actual client ID, secret, and authorization code
response = requests.post("https://www.linkedin.com/oauth/v2/accessToken", data={
    "grant_type": "authorization_code",
    "code": "AQQLGDN17OOWQxdx7vnyz-tC8RHdK7o7WW-BQfYiH8Y_vkQQJ4SFnbHW76pVXuorJ8QWHfQm8AsGKtWWFdteVQ77RLnwDZ9fHoNJA8xj728tH1yETAsZj0YdOTelm1bfWgaljDQIIu0bCGfD4ptrdO55qSld6QytW8PqIm2nN2Sk-XDpht0PnJZwmMJxvkLy35cQsFtNOTLvwRPvliw",
    "redirect_uri": "https://www.linkedin.com/developers/tools/oauth/redirect",
    "client_id": "86lj5vskjsw86c",
    "client_secret": "WPL_AP1.Gs7wIacL4OINUnow.ZcE7mA=="
})

print(response.json())  # Check if "id_token" is included

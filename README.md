# CODE CHALLENGE ROUND 1

## FINAL SOLUTION 

### My Idea: 
<h3>Backend:</h3> 
<h4>Library used: Axios,express, firebase, nodemon, twilio, cors, dotenv</h4>
<h3>Frontend:</h3>
<h4>Library used: React typescript, tailwindcss, MUI , axios, tantack/react-query</h4>

### Missing Function 
Backend: Cannot persist favorite_git_user in firebase database when user logout
Frontend: 
- Cannot change the like/heart icon on the selected github profile must be lighted up even after the page is refreshed. Sorry I spend so much time for doing this action but i've failed, but I know the flow code doing that.
- the task is to add pagination which allows the user to select the page # and number of results per page. I have solution that click the next page instead of input the random page. I don't know how to solve it. 

### Frontend URL : https://github-social-validation.vercel.app/
### Backend URL : https://minisocialgithubapp.onrender.com/

#### Link Get Free Phone Number : https://getfreesmsnumber.com/virtual-phone/p-14244046240
#### Get accessCode through a link above with verified phone number: 14244046240 , Iam sorry because i used twilio trial account that just accept verified phone number.

### .env of frontend 
```
  backend: https://minisocialgithubapp.onrender.com/
  
```

### .env of backend
```
# TWILIO KEY

PORT = 4000
TWILIO_ACCOUNT_SID = AC4b9c39bdf6609c86bbbfb2f2414d53fd
TWILIO_AUTH_TOKEN = 27f817c2e4adc157de941bc28fef83d8
TWILIO_VERIFY_SID = VA39052021453e685bb26e53981106bf8f
TWILIO_PHONE_NUMBER = +17655536728

# Firebase Key

FIREBASE_PROJECT_ID = githubsocial-e3224
FIREBASE_PRIVATE_KEY ="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNz4tvW4d3gnZL\n/CSxkFjknMKolTy87QurMbMHt3UZENAPVhIRYZ/WRtUQ3tNERyHSM8+FZiWNY1RF\nHF/mWn9yxC47P6J06E5quUl767iDH1EGghd0KP4JhknE9sy+jQYsAmGOjXUUP/Mf\nSwqBQcCmiUP0PTG4OxT5/IEctuRVWvCuxR3QUZ1zSlIP6u8U4gp0tootPW0dv2cW\nwGBbXqE57k1CPQZwXTMypSpC5N6ayU4w9wco18z7ez6koLGeWZXcrDb57ZNMMSOt\n+rpjoMM8HEYwsqfFbwn992LJ6K1p5xBBA4d9D4IJEW+fDYBqWfY4gwSw7J81orjh\npEMgOrY3AgMBAAECggEAPvIXJzvLNtYD8EFxx4zqYyE+t+jM5stpIjbVFqsZeU0X\nFVmxtPcyt4p6Z+p+mwdWZL/L3HTdT1ztzSVcf0t2Z1dw/FX+DdtvAF0jCG+Twya0\n1VS8b56J88fKkB8bh7wCAzvHMp45DLRyW0PMNrQxg72/ttdweXQ4eiysIGgfdasK\nPCcRjRk+v4XTLKy/a1KQYiwMoj6b3THdyXdH9nXew2nJWK/B7Vsw7Ppe/VmrTusH\n6ZHnaCRrpyPJtRXU02rUy3Vi1iOY77TJDLI/GBFGJgOsQ1rEANx+/AKEz9tUZouQ\nE5cW0XhPxt1tvDsONfgtuxWHHClqYINhwkhnegUpAQKBgQDph8eoHYH4zIL0mAUT\nCdmiSxjDLRm2rZtkDbbhHP/oVr+u7OY9f6yvgc6R/jH6z7cRpwL3v5304yvjqww3\nTute+fQVHWZhwBK23uwoxM9t9eTbLsY6GvtpbmAGfBzkIBW0zW9JlW1d2bdikIqO\n3VGLcZnT8ZrwXC5qrbDddt2iVwKBgQDhnPxdexcDtzi+wiERohLVH37VYMF+zmAN\nhExAE71SIkStuvAq6XjMvm/Bf+aiFkscpwzTQTn////aLAJk1miKfJ5NwHMt06us\nMIqCkjHCGZf+3hKMRaZByXRN0NV9WSUBWACedAiBRvBX0+dm1cBJBHsepAgVnPGy\nUDnF+1nfIQKBgQCSYcIM5zIpOkh7+S51GJ+K03faH9MWZwwYU2BnCz597KKKi4Rm\n2DjuaneJm8TIaptePUnm8f2ZGyzPsNAfeyCekB8nfR5H95XDe0ic5YEAdDnYCiHH\nGlKta7pVVkbl2BbDFmLDxR6gzW/eIKw5kREkTzkVWUS9lYqi4+0RZQjYUQKBgDq4\nIhKuc6n66OD1I6g0N5SSku80NIgtbGB4O2Q9/vs+ggN5cQKqK0+WjP2erUcoaDo3\n3CWrh03ysgN1itX129WXY5g264NU4Qx6wcIEDMFI6f9iiw9JHWFn7kZGgRoTtobo\nAZk79+61qN4i/8oK/fXDHcw2wwflBh7ztGWr6pMhAoGAFVGevQpxJTDel9iisVPZ\nbrWZOGS8siPMoVUhP8klq4fTdSX/68NGy4/cALjFrl1n2Snxvoy2qZlHCM9TMeIg\nGwEnlpcAz1o3c9fgSkZVBRNL5UwvbBcGO7bp6r6D2W3+BE4zrlsG4o3NQTezslKU\nrkhDJEdz6m+zYs2fJ9MQVAA=\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-ws9l9@githubsocial-e3224.iam.gserviceaccount.com
FIREBASE_DATABASE_URL = https://githubsocial-e3224-default-rtdb.asia-southeast1.firebasedatabase.app
FIREBASE_AUTH_DOMAIN = 1:919288043645:web:7ab4885953892a22643914
FIREBASE_APP_ID = githubsocial-e3224.firebaseapp.com

```
### Login Page
![Login_page](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043589/githubsocial/Screenshot_2023-02-10_at_22.20.16_tcnuzx.png)
### Dashboard 
![DashBoard](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043589/githubsocial/Screenshot_2023-02-10_at_22.22.17_ujlgp9.png)

![DashBoard2](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043589/githubsocial/Screenshot_2023-02-10_at_22.22.25_scznbe.png)

### Like User
![LikeUser](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043589/githubsocial/Screenshot_2023-02-10_at_22.22.45_q1e6zx.png)

### Get User Profile 
![GetProfile](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043589/githubsocial/Screenshot_2023-02-10_at_22.22.37_ahpmi9.png)

### Database
![Firebase](https://res.cloudinary.com/dfaejacdn/image/upload/v1676043587/githubsocial/Screenshot_2023-02-10_at_21.32.02_qpwl9g.png)

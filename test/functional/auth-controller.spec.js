'use strict'

const jwt = use('jsonwebtoken');

const { test, trait } = use('Test/Suite')('Auth Controller')

trait('Test/ApiClient')

test('make sure authenticator may parse token', async ({ client, assert }) => {

    const rightNow = Date.now()
    const exp = rightNow + 300
  
    const data = 
    {  
      "header": 
      {
        "alg":"RS256",
        "typ":"JWT",
        "kid":"85unpCvPG3CCcTxKWgrd_cfWSi3uQGXOfbIVEzDePAk"
      },
      "payload": 
      {
        "exp":exp,
        "iat":rightNow,
        "jti":"cb1902f1-95f5-4403-adfb-07b8d931f7f2",
        "iss":"https://sso.digitalservice.jabarprov.go.id/auth/realms/jabarprov",
        "sub":"98af99e9-5dbf-4cec-a061-6ec31d31d62f",
        "typ":"Bearer",
        "azp":"digiteam-servicedesk-service",
        "session_state":"ec9b67ab-fee8-46c9-b581-cd636bfa58d0",
        "acr":"1",
        "scope":"profile email",
        "email_verified":true,
        "name":"Eka Dewi Triyanti",
        "preferred_username":"anti_rei@yahoo.com",
        "given_name":"Eka Dewi",
        "family_name":"Triyanti",
        "email":"anti_rei@yahoo.com"
      },
      "signature": "Ccmb2xLw5FP-tRXzP_nQsnIizpq_u7TMbNGdNc2GNMkRsAPn4_VLmAPheUEHvgHjUlEgpto7SUkRGKMkBL53Hh7rtHSIWunXpHriIN7l0JD8ZfB_IUMMj4KnRn9kpJFBAaLAHds7qRLQX7bZO_BAFJFHXzq91lfUUFS_C50ysaiK23QeGqRo4FmFdv9CXzJ1AMlaWoswMPlj38PsKcn4wJyQuLBWIPcVcatBuB9MYSLXN1rRDcpixhAac6dm5ZV3W03sR7Y7Ydc_JZy-1wzSWRE4kXUNuJEDtCilg4IVorqcJ3w6VxhpTzuER8dtw0Z85Z-RstpAU6dNZVwgUWi7GQ"
    }

    var req = await jwt
      .sign(
      {
          algorithm: data.header, 
          payload: data.payload 
      },
      process.env.secret
      )

      console.log('token: ', req)

   const response = await client
    .get('/validate')
    .header({
      Authorization: `Bearer ${req}`,
      kid : process.env.kid
    })
    .end()

    console.log('error', response.error)
    
  response.assertStatus(200)
  assert.isDefined(response)

}).timeout(0)

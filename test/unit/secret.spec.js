'use strict'

const { test, trait } = use('Test/Suite')('Secret')

trait('Test/ApiClient')
test('should be able to retrieved JWKS info', async ({ client }) => {
 
  const response = await client
    .get(process.env.JWKS)
    .end()

  response.assertJSONSubset(
    {
      "keys":
      [{
        "kid": "85unpCvPG3CCcTxKWgrd_cfWSi3uQGXOfbIVEzDePAk",
        "kty": "RSA",
        "alg": "RS256",
        "use": "sig",
        "n": "yZOvEJ1n5W78DOJ7Ifj2J7Ici-FzNjKLHyS_FFxFdNQR8x909Y1_GW9uSAy2fNAANDbu5TEhh5tx4q3rXbMJ9gKiKtY8-OFAdOUrAvzBtlfr2FYaz-RVcJklJ5SS1Ax-A1OKrGgenpZn5ng5XGJ4sZae1c5lidyDSo67fO8z6IyWZPCuCbMT-rdadGVe0gSL0Ia3pbDpYzBtblWAT74BC61fFe19O9Qpiy5P1P0Is2CsDXJIfkwj0eeWgVimoCYMycp0CBqIZ_HdHmT3PuKBtE1Pao8vj7IaHz1NLYZK-mCn7vJIhpf_dZi8X2x7Dop4dMOYRA8qnbIGhNuL7fhWzQ",
        "e": "AQAB",
        "x5c":
        [
          "MIICoTCCAYkCBgFz6sQnKzANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAlqYWJhcnByb3YwHhcNMjAwODE0MDIxODEwWhcNMzAwODE0MDIxOTUwWjAUMRIwEAYDVQQDDAlqYWJhcnByb3YwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJk68QnWflbvwM4nsh+PYnshyL4XM2MosfJL8UXEV01BHzH3T1jX8Zb25IDLZ80AA0Nu7lMSGHm3Hiretdswn2AqIq1jz44UB05SsC/MG2V+vYVhrP5FVwmSUnlJLUDH4DU4qsaB6elmfmeDlcYnixlp7VzmWJ3INKjrt87zPojJZk8K4JsxP6t1p0ZV7SBIvQhrelsOljMG1uVYBPvgELrV8V7X071CmLLk/U/QizYKwNckh+TCPR55aBWKagJgzJynQIGohn8d0eZPc+4oG0TU9qjy+PshofPU0thkr6YKfu8kiGl/91mLxfbHsOinh0w5hEDyqdsgaE24vt+FbNAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAENJl2+gTb9RiXhT7eWdflgra+Uzbu4T25LCxiZl2OOtPOBZm8CYw1HY1KyAH3EYDRk7h4VgDCmRJxfArqDmAEAMzZ73qG1tf3FP4vaXQhkCZWwH0kEzPqLwfoJqqa7bVhA9g8RZiyYRYzTI7SKfMTu/JuL5mvUi+fD+aIT/1Id5fFNJtg4H2kkTULAlAOamP9xw3a3DqbRpySLfqOWFj3jyzc70aFhzeTKDgipa4KdckDVTVriIExgzuxxF9SNg+Gz9jtcRcrCc4cOx2UNlqX/3qVnHn6w/vLjke7K2BHzoYyTWdBkvWkfoD5rbgDoOveFcZgeMtJBSa6Ec9/yS1Sg="
        ],
        "x5t": "yrC-RiGq7eQTvYmrowPsJxaBgiM",
        "x5t#S256": "ItEK3FjBigA6Q0EDJiP-UgtyTcj1dlT4kvmSzuHOjH0"
      }]
    }
  )
});

test('should be able to retrieved token when given valid input', async ({assert, client}) => {

  const response = await client
    .post('https://sso.digitalservice.jabarprov.go.id/auth/realms/jabarprov/protocol/openid-connect/token')
    .header(
      { 
        "content-type" : "application/x-www-form-urlencoded",
        "Accept-Encoding" : "gzip, deflate, br"
      })
    .send(
      {
        grant_type: 'password',
        client_id: 'digiteam-servicedesk-service',
        username: 'selvyfiriani@gmail.com',
        password: 'Xcdu9vApTnys2Duu'
      }
    )
    .end()

    assert.exists('access_token', response)
})

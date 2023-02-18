<script lang="ts">
  import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
  } from 'amazon-cognito-identity-js'
  import {
    PUBLIC_AMPLIFY_AUTH_USER_POOL_ID,
    PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,
  } from '$env/static/public'

  const userPool = new CognitoUserPool({
    UserPoolId: PUBLIC_AMPLIFY_AUTH_USER_POOL_ID,
    ClientId: PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,
  })

  const onSignup = async () => {
    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: 'mp@mercury.fan',
    })

    const attributes = [emailAttribute]

    userPool.signUp(
      'mp@mercury.fan',
      'Password123!',
      attributes,
      [],
      (err, result) => {
        if (err) {
          throw err
        }

        var cognitoUser = result?.user
        console.log(`user name is ${cognitoUser?.getUsername()}`)
      },
      { sessionId: 'sessionId' },
    )
  }

  const onConfirm = async () => {
    const cognitoUser = new CognitoUser({ Pool: userPool, Username: 'mp@mercury.fan' })
    cognitoUser.confirmRegistration(
      '995131',
      true,
      (err, result) => {
        if (err) {
          throw err
        }
        console.log(`confirmRegistration result ${result}`)
      },
      { sessionId: 'sessionId' },
    )
  }

  const onSignin = async () => {
    const cognitoUser = new CognitoUser({ Pool: userPool, Username: 'mp@mercury.fan' })
    const authDetails = new AuthenticationDetails({
      Username: cognitoUser.getUsername(),
      Password: 'Password123!',
      ClientMetadata: {
        sessionId: 'sessionId',
      },
    })

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result: CognitoUserSession) => {
        console.log(`isValid ${result.isValid()}`)
        console.log(`idToken Payload ${JSON.stringify(result)}`)
      },
      onFailure: (err) => {
        console.log(`authenticateUser error ${err}`)
      },
    })
  }
</script>

<h1 class="text-5xl">amazon-cognito-identity-js</h1>

<form on:submit|preventDefault="{onSignup}">
  <button type="submit">SignUp</button>
</form>

<form on:submit|preventDefault="{onConfirm}">
  <button type="submit">Confirm</button>
</form>

<form on:submit|preventDefault="{onSignin}">
  <button type="submit">SignIn</button>
</form>

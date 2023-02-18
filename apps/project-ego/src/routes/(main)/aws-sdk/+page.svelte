<script lang="ts">
  import { env } from '$env/dynamic/public'
  import {
    CognitoIdentityProvider,
    type SignUpCommandInput,
    type ConfirmSignUpCommandInput,
    type InitiateAuthCommandInput,
    AuthFlowType,
  } from '@aws-sdk/client-cognito-identity-provider'

  const onSignup = async () => {
    const provider = new CognitoIdentityProvider({ region: env.PUBLIC_AMPLIFY_AUTH_REGION })

    const command: SignUpCommandInput = {
      ClientId: env.PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,
      Username: 'mp@mercury.fan',
      Password: 'Password123!',
      UserAttributes: [
        {
          Name: 'email',
          Value: 'mp@mercury.fan',
        },
      ],
      ClientMetadata: {
        sessionId: 'sessionId',
      },
    }

    try {
      const result = await provider.signUp(command)
      console.log('Signup success. Result: ', result)
    } catch (err) {
      console.log('Signup fail. Error: ', err)
    }
  }

  const onConfirm = async () => {
    const provider = new CognitoIdentityProvider({ region: env.PUBLIC_AMPLIFY_AUTH_REGION })

    const command: ConfirmSignUpCommandInput = {
      ClientId: env.PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,
      ConfirmationCode: '686536',
      Username: 'mp@mercury.fan',
      ClientMetadata: {
        sessionId: 'sessionId',
      },
    }

    try {
      const result = await provider.confirmSignUp(command)
      console.log('Signup success. Result: ', result)
    } catch (err) {
      console.log('Confirm Signup fail. Error: ', err)
    }
  }

  const onSignin = async () => {
    const provider = new CognitoIdentityProvider({ region: env.PUBLIC_AMPLIFY_AUTH_REGION })

    const command: InitiateAuthCommandInput = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: 'mp@mercury.fan',
        PASSWORD: 'Password123!',
      },
      ClientId: env.PUBLIC_AMPLIFY_AUTH_WEB_CLIENT_ID,
      ClientMetadata: {
        sessionId: 'sessionId',
      },
    }

    try {
      const result = await provider.initiateAuth(command)
      console.log('SignIn success. Result: ', result)
    } catch (err) {
      console.log('SignIn fail. Error: ', err)
    }
  }
</script>

<h1 class="text-5xl">@aws-sdk/client-cognito-identity-provider</h1>

<form on:submit|preventDefault="{onSignup}">
  <button type="submit">SignUp</button>
</form>

<form on:submit|preventDefault="{onConfirm}">
  <button type="submit">Confirm</button>
</form>

<form on:submit|preventDefault="{onSignin}">
  <button type="submit">SignIn</button>
</form>

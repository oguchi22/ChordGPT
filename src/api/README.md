## Demo API (AWS Lambda)

The demo site calls this Lambda function (through API Gateway), which calls the OpenAI API.
The OpenAI API key stays on the server and is never shipped to the browser.

### Build the deployment package

```
cd src/api
yarn install --production
yarn package
```

This creates `index.zip` (`index.js`, `package.json` and `node_modules`).

### Update the existing Lambda function

1. Open the function in the AWS Lambda Console.
2. **Code** tab → **Upload from** → **.zip file** → select `index.zip` → **Save**.
3. **Runtime settings** → **Edit**: set Runtime to **Node.js 22.x** (anything 20.x or newer works) and keep Handler as `index.handler`.
4. **Configuration** → **General configuration**: set Timeout to **30 sec**.
5. **Configuration** → **Environment variables**:
   - `OPENAI_API_KEY`: your OpenAI API key
   - `OPENAI_API_MODEL`: a current chat model (defaults to `gpt-4o-mini` if unset)
   - `ALLOW_ORIGIN`: `https://oguchi22.github.io`

### Recommended: limit abuse

The API is public, so set limits to cap costs:

- API Gateway → your API → **Stages** → `prod` → **Stage settings** → enable throttling (e.g. rate 1 request/sec, burst 5).
- OpenAI dashboard → **Limits**: set a monthly budget.

The function itself rejects invalid input, caps the user prompt at 500 characters,
and aborts the OpenAI calls after 25 seconds (API Gateway times out at ~29 seconds).

### Creating it from scratch

1. Lambda Console → **Create function** → Author from scratch, Runtime **Node.js 22.x**.
2. Upload `index.zip` and set the timeout and environment variables as above.
3. API Gateway → **Create API** → REST API → create a resource (e.g. `generateChordProgression`)
   with a `POST` method using **Lambda Proxy integration**, enable CORS, and deploy to a `prod` stage.
4. Use the stage's Invoke URL (plus the resource path) as `REACT_APP_LAMBDA_API_URL` when building the frontend.

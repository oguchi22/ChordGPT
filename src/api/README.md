## Demo API Setting

1. Initialize a new Node.js project by running:

```
npm init -y
```

2. Install the required dependencies:

```
npm install langchain openai
```

3. Zip the contents of this directory. Make sure to include the node_modules folder, index.js, and package.json:

```
zip -r index.zip .
```

## AWS Setting

Now, you're ready to create the AWS Lambda function:

1. Go to the AWS Lambda Console.
2. Click on the "Create function" button.
3. Select "Author from scratch".
4. Enter a function name (e.g., "chordgptLambdaFunction").
5. Choose "Node.js xx.x" as the runtime.
6. Under "Function code", choose "Upload a .zip file" and select the index.zip file you created earlier.
7. In the "Execution role" section, you can choose an existing role with basic AWS Lambda permissions or create a new role.
8. Click on "Create function".

Once the function is created, add your OpenAI API key and model name as environment variables:

1. In the "Configuration" tab, click on "Environment variables".
2. Add a new environment variable called OPENAI_API_KEY with the value set to your OpenAI API key.
3. Add another environment variable called OPENAI_API_MODEL with the value set to the desired model name, such as "gpt-3.5-turbo".
4. Add another environment variable called ALLOW_ORIGIN with the value set to origin of your demo site, such as "https://oguchi22.github.io".
5. Save the environment variables.

Finally, set up an API Gateway to trigger your Lambda function:

1. Go to the API Gateway Console.
2. Click on "Create API".
3. Choose "REST API" and click on "Build".
4. Choose "New API", give it a name (e.g., "chordgptAPI"), and click on "Create API".
5. In the "Actions" dropdown, choose "Create Resource". Name the resource (e.g., "generateChordProgression") and click on "Create Resource".
6. With the new resource selected, click on the "Actions" dropdown and choose "Create Method", then select "POST".
7. In the "Integration type" section, choose "Lambda Function".
8. Check the "Use Lambda Proxy integration" checkbox.
9. Select the region where your Lambda function is located and enter the Lambda function name in the "Lambda Function" field. Click on "Save".
10. Deploy the API by clicking on the "Actions" dropdown and choosing "Deploy API". Select "New Stage", give it a name (e.g., "prod"), and click on "Deploy".
11. You'll find the "Invoke URL" in the "Stages" section, which you can use as REACT_APP_LAMBDA_API_URL in the useChatGPT.js file.

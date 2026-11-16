#!/usr/bin/env bash
# Deploys this Lambda function and updates its settings.
# Run it in AWS CloudShell (ap-northeast-1), from a clone of the demo branch:
#
#   git clone -b demo --depth 1 https://github.com/oguchi22/ChordGPT
#   bash ChordGPT/src/api/deploy.sh
#
set -euo pipefail

export AWS_REGION="${AWS_REGION:-ap-northeast-1}"
API_ID="${API_ID:-lxo4hokxv6}"
RESOURCE_PATH="${RESOURCE_PATH:-/generatechordprogression}"
STAGE="${STAGE:-prod}"
ALLOW_ORIGIN="${ALLOW_ORIGIN:-https://oguchi22.github.io}"
API_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "== Finding the Lambda function behind API ${API_ID}${RESOURCE_PATH}"
RES_ID=$(aws apigateway get-resources --rest-api-id "$API_ID" --limit 500 \
  --query "items[?path=='${RESOURCE_PATH}'].id" --output text)
FN=$(aws apigateway get-integration --rest-api-id "$API_ID" --resource-id "$RES_ID" \
  --http-method POST --query uri --output text | sed -E 's#.*/functions/(.*)/invocations#\1#')
echo "   Function: $FN"

echo "== Building index.zip"
cd "$API_DIR"
rm -rf node_modules index.zip
npm install --omit=dev --no-audit --no-fund --silent
zip -qr index.zip index.js package.json node_modules

echo "== Uploading code"
aws lambda update-function-code --function-name "$FN" --zip-file fileb://index.zip \
  --query LastUpdateStatus --output text
aws lambda wait function-updated --function-name "$FN"

echo
read -rp "OpenAI model [gpt-4o-mini]: " MODEL
MODEL="${MODEL:-gpt-4o-mini}"
read -rsp "New OpenAI API key (press Enter to keep the current one): " KEY
echo

echo "== Updating runtime, timeout and environment variables"
CURRENT=$(aws lambda get-function-configuration --function-name "$FN" \
  --query 'Environment.Variables' --output json)
umask 077
CFG=$(mktemp)
trap 'rm -f "$CFG"' EXIT
echo "$CURRENT" | jq --arg fn "$FN" --arg m "$MODEL" --arg k "$KEY" --arg o "$ALLOW_ORIGIN" '{
  FunctionName: $fn,
  Runtime: "nodejs22.x",
  Handler: "index.handler",
  Timeout: 30,
  Environment: { Variables: ((. // {})
    + { OPENAI_API_MODEL: $m, ALLOW_ORIGIN: $o }
    + (if $k == "" then {} else { OPENAI_API_KEY: $k } end)) }
}' > "$CFG"
aws lambda update-function-configuration --cli-input-json "file://$CFG" \
  --query LastUpdateStatus --output text
aws lambda wait function-updated --function-name "$FN"

echo "== Limiting requests on stage '${STAGE}' (1 req/s, burst 5)"
aws apigateway update-stage --rest-api-id "$API_ID" --stage-name "$STAGE" \
  --patch-operations \
    op=replace,path=/*/*/throttling/rateLimit,value=1 \
    op=replace,path=/*/*/throttling/burstLimit,value=5 \
  --query 'methodSettings' --output json > /dev/null

echo "== Test request"
URL="https://${API_ID}.execute-api.${AWS_REGION}.amazonaws.com/${STAGE}${RESOURCE_PATH}"
curl -sS -m 35 -w '\nHTTP %{http_code}\n' -X POST -H 'Content-Type: application/json' \
  -d '{"complexity":2,"key":"C Major","tempo":120,"number_of_bars":4,"firstChord":"I","userPrompt":"happy pop"}' \
  "$URL"
echo
echo "If the test failed, check the logs: aws logs tail /aws/lambda/${FN##*:} --since 10m"

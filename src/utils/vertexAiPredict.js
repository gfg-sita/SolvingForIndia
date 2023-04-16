/*const fs = require('fs');
const {PredictionServiceClient} = require('@google-cloud/aiplatform');
const {GoogleAuth} = require('google-auth-library');
const projectId = process.env.VERTEX_PROJECT_ID;
//process.env.GRPC_TRACE = 'all';
//process.env.GRPC_VERBOSITY = 'DEBUG';


// Set the path to the downloaded JSON credentials file
const GOOGLE_APPLICATION_CREDENTIALS = "./secrets/soil-classification-model-ebe356425d97.json";

async function main() {
  // Configure the client with the credentials and project ID
  const auth = new GoogleAuth({
    keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const credentials = await auth.getCredentials();
  const projectId = await auth.getProjectId();

  // Create the Vertex AI client
  const client = new PredictionServiceClient({credentials});

  // Set the model resource name and endpoint
  const modelId = "";
  const location = '';
  const modelFullName = `projects/${projectId}/locations/${location}/endpoints/${modelId}`;

  // Sample input values
  const inputs = {
    n: 90,
    p: 42,
    k: 43,
    temperature: 20.8797,
    humidity: 82.002,
    ph: 6.502,
    rainfall: 202.935,
  };

  // Call the function to get crop recommendations
  const cropRecommendations = await getCropRecommendations(client, inputs, modelFullName);
  console.log(cropRecommendations);
}

main().catch(console.error);


async function getCropRecommendations(client, inputs, modelFullName) {
  // Prepare the payload for the prediction request
  const payload = {
    structuredData: {
      values: [
        inputs.n,
        inputs.p,
        inputs.k,
        inputs.temperature,
        inputs.humidity,
        inputs.ph,
        inputs.rainfall,
      ],
    },
  };

  // Call the Vertex AI API to get predictions
  const [response] = await client.predict({
    endpoint: modelFullName,
    instances: [payload],
  });

  // Process the prediction results
  const cropRecommendations = response.predictions.map((prediction) => {
    return {
      crop: prediction.displayName,
      confidence: prediction.tables.score,
    };
  });

  return cropRecommendations;
}

main().catch(console.error);*/

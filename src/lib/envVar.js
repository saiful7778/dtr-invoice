const envVers = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRETS: process.env.GOOGLE_CLIENT_SECRETS,
  EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY,
  EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY,
};

export default function getEnvVar(varName) {
  if (typeof envVers[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit();
  } else {
    return envVers[varName];
  }
}

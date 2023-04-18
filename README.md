# SITA

SITA is a comprehensive agricultural platform designed to cater to the needs of farmers, food and beverage industry players, and regulators. It serves as a one-stop solution for agricultural requirements, offering features such as viewing real-time sensor data, providing machine learning-based crop recommendations, and connecting users through a marketplace for buy and sell orders. The app leverages Google Cloud ML tools, OpenAI's ChatGPT for sustainable farming tips, and APIs like OpenWeatherAPI and Agromonitor for weather and satellite data.

## System Architecture

The system architecture comprises several components, including frontend, backend, APIs, databases, and microservices that interact with each other to provide the desired functionality. The project uses technologies and frameworks like Google Cloud Compute, Google Cloud AutoML and Vertex AI, InfluxDB, CockroachDB, JSON Web Tokens and bcrypt, Twilio, Speakeasy, Nodemailer, OpenAI API, Google Cloud API, ORM using Sequelize, InfluxData API, Highcharts, Express, Node.js, HTML, Vanilla CSS, Vanilla JavaScript, Arduino, and Python.


## Installation and Setup

1. Clone the repository to your local machine.
2. Install Node.js and npm (if not already installed).
3. Navigate to the project directory and run `npm install` to install all necessary dependencies.
4. Set up the required databases (Google Cloud SQL, InfluxDB, and CockroachDB) individually, following their respective setup guides.
5. Configure the environment variables for databases and APIs in the `.env` file.
6. Connect and configure the Arduino device with the necessary sensors.
7. Run the application locally using `npm start`.

## Usage and Examples

To use SITA, follow these steps:

1. Sign up for an account on the `signup.html` page.
2. After successful signup, you'll be redirected to the OTP verification page (`otp_verification.html`). Enter the OTP received via email or SMS.
3. Once verified, you'll be taken to the dashboard (`a.html`), where you can see real-time sensor data, AI recommendations, and navigate to pages for creating orders or viewing the marketplace.
4. SITA will provide crop recommendations based on the sensor data, weather, and satellite information using Google Cloud AutoML and Vertex AI.
5. Get sustainable farming tips based on the current soil condition via OpenAI's ChatGPT.

## Troubleshooting and FAQ

Refer to the documentation of the respective technologies and frameworks used in the project for troubleshooting and FAQs. For issues specific to SITA, create an issue in the project's issue tracker.

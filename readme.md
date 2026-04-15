<h1>Pokemon Chatbot API Service</h1>

<p>This is a simple API service built with <strong>Express.js</strong> and <strong>MongoDB</strong> to support a chatbot integration with the <strong>Kata.ai Platform</strong>. This service handles user registration and acts as a bridge to fetch data from the <strong>PokeAPI</strong>.</p>

<h2>🚀 Features</h2>
<ul>
  <li><strong>User Registration</strong>: Saves chatbot users' data to MongoDB.</li>
  <li><strong>Security</strong>: Secured endpoints using <code>X-Auth</code> custom header validation.</li>
  <li><strong>Pokemon Information</strong>: Proxy to fetch detailed Pokemon data from PokeAPI.</li>
  <li><strong>Enterprise Ready</strong>: Clean code structure with middleware and environment variable configuration.</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Runtime</strong>: Node.js</li>
  <li><strong>Framework</strong>: Express.js</li>
  <li><strong>Database</strong>: MongoDB (via Mongoose)</li>
  <li><strong>HTTP Client</strong>: Axios</li>
  <li><strong>Environment</strong>: Dotenv</li>
</ul>

<h2>📋 Prerequisites</h2>
<ul>
  <li>Node.js (v14 or later)</li>
  <li>npm (v6 or later)</li>
  <li>MongoDB (Local instance or MongoDB Atlas)</li>
</ul>

<h2>⚙️ Installation & Setup</h2>

<h3>1. Clone the repository:</h3>
<pre><code>git clone &lt;your-repository-url&gt;
cd pokemon-bot-api</code></pre>

<h3>2. Install dependencies:</h3>
<pre><code>npm install</code></pre>

<h3>3. Configure environment variables:</h3>
<p>Create a <code>.env</code> file in the root directory and fill in the following:</p>
<pre><code>PORT=3000
MONGO_URI=mongodb://localhost:27017/kata_task
WEBHOOK_SECRET=RahasiaBotPokemon123</code></pre>

<h3>4. Run the application:</h3>
<pre><code># For production
npm start

# For development
npm run dev</code></pre>

<h2>🔌 API Documentation</h2>

<h3>1. Register User</h3>
<p>Used by Kata.ai Webhook/Action to save user identity after registration flow.</p>
<ul>
  <li><strong>URL:</strong> <code>/register</code></li>
  <li><strong>Method:</strong> <code>POST</code></li>
  <li><strong>Headers:</strong>
    <ul>
      <li><code>Content-Type: application/json</code></li>
      <li><code>X-Auth: &lt;your_webhook_secret&gt;</code></li>
    </ul>
  </li>
</ul>
<p><strong>Request Body:</strong></p>
<pre><code>{
  "name": "String"
}</code></pre>


<h2>🧪 Testing with cURL</h2>
<pre><code>curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -H "X-Auth: RahasiaBotPokemon123" \
  -d '{"name": "Ash Ketchum"}'</code></pre>

<h2>🗺 System Architecture</h2>
<pre><code>[ User ] <--> [ Telegram ] <--> [ Kata.ai Platform ] ----------> [ PokeAPI ] (fetch pokemon data)
                                       |
                                       | (HTTP Request)
                                       v
                        [ Express.js API Service ] ----------> [ MongoDB ]
                                (Save User)</code></pre>
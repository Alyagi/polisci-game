const https = require("https");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "ANTHROPIC_API_KEY not set" })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const payload = JSON.stringify({
      model: body.model || "claude-sonnet-4-5",
      max_tokens: body.max_tokens || 1000,
      messages: body.messages
    });

    const data = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        }
      }, (res) => {
        let raw = "";
        res.on("data", chunk => raw += chunk);
        res.on("end", () => {
          try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
          catch(e) { reject(new Error("JSON parse failed: " + raw)); }
        });
      });
      req.on("error", reject);
      req.write(payload);
      req.end();
    });

    return {
      statusCode: data.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data.body)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000
require("dotenv").config();

app.use(cors())

app.use(express.json());

const OpenAI = require("openai");
const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  return res.status(200).json({success: "Ping Successful"})
})

app.get("/get-sample-prompts", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: process.env.GET_SAMPLE_PROMPTS,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return res.status(201).json({ result: completion.choices[0].message });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal Server Error" });
  }
});

app.post("/create-chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    return res.status(201).json({ result: completion.choices[0].message });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log("Proxy server is up on port: "+PORT));

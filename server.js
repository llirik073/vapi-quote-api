
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const quotes = [
  "Every great idea starts with one small step.",
  "Keep learning and building every day.",
  "Small progress is still progress.",
  "The best time to start is now.",
  "Success comes from consistency."
];

app.get("/", (req, res) => {
  res.json({
    name: "vAPI Quote API",
    status: "online",
    version: "1.0.0"
  });
});

app.get("/quote", (req, res) => {
  const quote = quotes[
    Math.floor(Math.random() * quotes.length)
  ];

  res.json({
    quote,
    source: "vAPI Quote API"
  });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/create_timestamp_file", (req, res) => {
  try {
    const { folder_path } = req.body;

    if (!folder_path) {
      return res.status(400).json({ error: "Missing 'folder_path' parameter" });
    }
    if (!fs.existsSync(folder_path)) {
      fs.mkdirSync(folder_path, { recursive: true });
    }

    const current_time = new Date().toString();
    const file_content = current_time;

    const filename =
      current_time.replace(/[:.]/g, "").replace(/ /g, "_") + ".txt";

    const file_path = `${folder_path}/${filename}`;

    fs.writeFileSync(file_path, file_content);

    res.status(201).json({
      message: `File '${filename}' created successfully with content '${file_content}'`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log(`The port is running on ${port}`);
});

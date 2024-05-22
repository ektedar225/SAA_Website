const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const logger = require("./utils/logger");

const templatesDir = path.join("./", "views");
const outputDir = path.join("./", "public", "stylesheets");
const inputCss = path.join("./", "public", "stylesheets", "tailwind.css");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate CSS for each main template and its partials
const templates = ["home", "team", "gallery", "events"]; // Add more templates as needed

templates.forEach((template) => {
  const mainTemplatePath = path.join(templatesDir, `${template}.ejs`);
  const partialsPath = path.join(templatesDir, template, "**/*.ejs");
  const outputCssPath = path.join(outputDir, `${template}.css`);

  exec(
    `npx tailwindcss-cli -i ${inputCss} -o ${outputCssPath} --content "${mainTemplatePath}" "${partialsPath}"`,
    (err, stdout, stderr) => {
      if (err) {
        logger(`Error generating CSS for ${template}: ${stderr}`, "error")
      } else {
        logger(`Generated ${outputCssPath}`, "success");
      }
    }
  );
});

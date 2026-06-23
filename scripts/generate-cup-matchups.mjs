import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const campaignDir = path.join(root, "social-campaigns", "cup-matchup");
const inputCsv = process.argv[2]
  ? path.resolve(root, process.argv[2])
  : path.join(campaignDir, "input", "matchups.csv");

const templatePath = path.join(campaignDir, "templates", "cup-matchup-template.svg");
const countriesPath = path.join(campaignDir, "assets", "countries", "countries.json");
const imagesDir = path.join(campaignDir, "output", "images");
const captionsDir = path.join(campaignDir, "output", "captions");
const cacheDir = path.join(campaignDir, "output", ".cache");

const requiredFields = ["date", "time", "country_1", "country_2", "post_status"];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted && char === '"' && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(value);
      value = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers, ...records] = rows;
  if (!headers) {
    return [];
  }

  const normalizedHeaders = headers.map((header) => header.trim());
  const missingFields = requiredFields.filter((field) => !normalizedHeaders.includes(field));
  if (missingFields.length) {
    throw new Error(`Missing required CSV fields: ${missingFields.join(", ")}`);
  }

  return records.map((record) =>
    Object.fromEntries(normalizedHeaders.map((header, index) => [header, (record[index] ?? "").trim()]))
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function fitFontSize(countryName) {
  if (countryName.length <= 9) return 47;
  if (countryName.length <= 12) return 41;
  return 35;
}

function captionFor(row, country1, country2) {
  if (row.caption_override) {
    return row.caption_override;
  }

  const when = [row.date, row.time].filter(Boolean).join(" at ");
  const dateLine = when ? `\n${when}.` : "";

  return [
    "CUP MATCHUP",
    `${country1} vs ${country2}.${dateLine}`,
    "Actual drinking cups. Not that other thing.",
    "Watch every game at Malone's Pub.",
    "Cold beer | Full bar | Big screens | Downtown Fort Worth."
  ].join("\n");
}

async function ensureOutputDirs() {
  await fs.mkdir(imagesDir, { recursive: true });
  await fs.mkdir(captionsDir, { recursive: true });
  await fs.mkdir(cacheDir, { recursive: true });
}

async function configureFontCache() {
  const fontConfigPath = path.join(cacheDir, "fonts.conf");
  const normalizedCacheDir = cacheDir.replaceAll("\\", "/");
  const fontConfig = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <cachedir>${normalizedCacheDir}</cachedir>
</fontconfig>
`;

  await fs.writeFile(fontConfigPath, fontConfig, "utf8");
  process.env.XDG_CACHE_HOME = cacheDir;
  process.env.FONTCONFIG_CACHE = cacheDir;
  process.env.FONTCONFIG_FILE = fontConfigPath;
  process.env.LOCALAPPDATA = cacheDir;
}

async function loadCountry(countries, rawName) {
  const key = slugify(rawName);
  const country = countries[key];
  if (!country) {
    throw new Error(`No country asset found for "${rawName}" (expected key "${key}")`);
  }

  const assetPath = path.join(campaignDir, "assets", "countries", country.asset);
  const svg = await fs.readFile(assetPath, "utf8");

  return {
    key,
    displayName: country.displayName,
    cup: dataUri(svg)
  };
}

async function main() {
  await ensureOutputDirs();
  await configureFontCache();
  const { default: sharp } = await import("sharp");

  const [template, countriesJson, csv] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    fs.readFile(countriesPath, "utf8"),
    fs.readFile(inputCsv, "utf8")
  ]);

  const countries = JSON.parse(countriesJson);
  const rows = parseCsv(csv);
  const captionRecords = [
    ["date", "time", "country_1", "country_2", "post_status", "platform", "image_filename", "caption"]
  ];

  for (const row of rows) {
    if (!row.country_1 || !row.country_2) {
      continue;
    }

    const [country1, country2] = await Promise.all([
      loadCountry(countries, row.country_1),
      loadCountry(countries, row.country_2)
    ]);

    const imageFilename =
      row.image_filename || `${country1.key}-vs-${country2.key}.png`;
    const captionFilename = imageFilename.replace(/\.[^.]+$/, ".txt");
    const caption = captionFor(row, country1.displayName, country2.displayName);

    const svg = template
      .replaceAll("{{cup1}}", country1.cup)
      .replaceAll("{{cup2}}", country2.cup)
      .replaceAll("{{country1}}", xmlEscape(country1.displayName))
      .replaceAll("{{country2}}", xmlEscape(country2.displayName))
      .replaceAll("{{country1Font}}", String(fitFontSize(country1.displayName)))
      .replaceAll("{{country2Font}}", String(fitFontSize(country2.displayName)));

    await sharp(Buffer.from(svg)).png().toFile(path.join(imagesDir, imageFilename));
    await fs.writeFile(path.join(captionsDir, captionFilename), `${caption}\n`, "utf8");

    captionRecords.push([
      row.date,
      row.time,
      country1.displayName,
      country2.displayName,
      row.post_status,
      row.platform || "Facebook",
      imageFilename,
      caption
    ]);
  }

  const captionsCsv = captionRecords
    .map((record) => record.map(csvEscape).join(","))
    .join("\n");

  await fs.writeFile(path.join(campaignDir, "output", "captions.csv"), `${captionsCsv}\n`, "utf8");
  await fs.writeFile(
    path.join(campaignDir, "output", "generation-log.json"),
    `${JSON.stringify({ input: path.relative(root, inputCsv), generatedAt: new Date().toISOString(), count: captionRecords.length - 1 }, null, 2)}\n`,
    "utf8"
  );

  console.log(`Generated ${captionRecords.length - 1} cup matchup post(s).`);
  console.log(`Images: ${path.relative(root, imagesDir)}`);
  console.log(`Captions: ${path.relative(root, captionsDir)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

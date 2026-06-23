# Cup Matchup Generator

This folder contains the Phase 1 automation for Malone's Pub "Cup Matchup" social posts. It generates square 1080x1080 PNG graphics and matching Facebook-ready captions from a CSV.

## Generate Posts

From the project root:

```bash
npm run generate:cup-matchups
```

Outputs are written to:

- `social-campaigns/cup-matchup/output/images/`
- `social-campaigns/cup-matchup/output/captions/`
- `social-campaigns/cup-matchup/output/captions.csv`
- `social-campaigns/cup-matchup/output/generation-log.json`

To use a different CSV:

```bash
node scripts/generate-cup-matchups.mjs social-campaigns/cup-matchup/input/my-matchups.csv
```

## Matchup CSV

Edit `input/matchups.csv`.

Required columns:

- `date`
- `time`
- `country_1`
- `country_2`
- `post_status`

Optional columns:

- `caption_override`
- `image_filename`
- `platform`

Example:

```csv
date,time,country_1,country_2,post_status,caption_override,image_filename,platform
2026-06-22,2:00 PM,Mexico,South Korea,draft,,mexico-vs-south-korea.png,Facebook
```

## Country Assets

Country cup assets live in `assets/countries/`.

To add a country:

1. Add an editable SVG cup asset, such as `assets/countries/france.svg`.
2. Add a matching entry to `assets/countries/countries.json`.
3. Use the `displayName` value in `input/matchups.csv`.
4. Run `npm run generate:cup-matchups`.

Country lookup is slug-based. For example, `South Korea` maps to `south-korea`.

## Template

The master template is `templates/cup-matchup-template.svg`.

Supported placeholders:

- `{{cup1}}`
- `{{cup2}}`
- `{{country1}}`
- `{{country2}}`
- `{{country1Font}}`
- `{{country2Font}}`

The rendered creative intentionally avoids official tournament marks, official logo language, sponsorship claims, and protected tournament branding. Keep recurring copy generic:

- Cup Matchup
- Actual drinking cups. Not that other thing.
- Watch Every Game
- Cold Beer / Full Bar / Big Screens
- Downtown Fort Worth

## Manual Approval Workflow

1. Keep new CSV rows as `post_status` = `draft`.
2. Generate the batch.
3. Review the PNGs in `output/images/` and captions in `output/captions.csv`.
4. Manually post or schedule approved posts in Meta Business Suite.
5. Update your tracking spreadsheet or CSV status after posting.

The current script does not publish to Facebook or Instagram. The output structure is designed so a later Phase 3 integration can read the same CSV rows and generated files.

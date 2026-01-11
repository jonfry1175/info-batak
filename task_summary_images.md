# Task Summary: Update Tokoh Profile Images

## Overview
Updated the profile images for historical figures on the Toba history page (`/sejarah/toba`) to ensure all figures have valid images instead of placeholders.

## Changes
1.  **Downloaded Images**:
    -   `sisingamangaraja.jpg`: Raja Sisingamangaraja XII
    -   `nommensen.png`: Dr. Ingwer Ludwig Nommensen
    -   `tb-silalahi.png`: TB Silalahi
    -   Refreshed/Downloaded these from Wikimedia Commons constants to `public/images/tokoh/`.

2.  **Updated Data**:
    -   Modified `content/data/rumpun.json` to point to the new image files for Nommensen and TB Silalahi.

## Verification
-   Verified the page `http://localhost:3000/sejarah/toba` using a browser subagent.
-   Confirmed via screenshot that all 3 figures now display their respective profile images.

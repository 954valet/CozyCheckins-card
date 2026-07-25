# Cozy Check-ins Digital Business Card — Complete Repository

This is the complete replacement repository.

## Final design
- Front uses the original house / mountain / tree / path artwork from the selected Cozy Check-ins card.
- Whole charcoal logo circle.
- White check.
- Only a **tiny yellow mark at the extreme tip** of the check.
- Nothing underneath the logo circle.
- Back is charcoal with the QR code.
- Tap/click the card to flip.
- Flip is implemented so only one face is visible at a time, preventing the transparent-overlap problem.

## Installed contact information
- Mark Murphy — Founder
- Phone: (276) 250-5397
- Email: mmurphy@cozycheckins.com
- Website: https://www.cozycheckins.com
- Linked-In: https://www.linkedin.com/in/mark-murphy-cozy

## Buttons
- Call
- Email
- Website
- Linked-In
- Save Contact
- Share

Nextdoor has been removed.

## Contact saving
`mark-murphy.vcf` is a standard vCard that can be opened/imported by iPhone and Android.

## QR
When the page is hosted over HTTPS, the QR code automatically points to the current digital-card page URL.

The Cozy check logo is centered in the QR and QR error correction is set to High.

If the JavaScript QR library cannot load, a bundled fallback QR points to:
https://www.cozycheckins.com

## Replace your old GitHub repository contents
The easiest clean method:

1. Delete the old `CozyCheckins-card` repository, or create a new empty repository.
2. Extract this ZIP.
3. Upload the CONTENTS of this folder to the root of the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `mark-murphy.vcf`
   - `README.md`
   - `assets/`
4. Commit the files.
5. Go to **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Branch: **main**
8. Folder: **/ (root)**
9. Save.

No build process is required.

# Untouched sources

The eleven 3D renders as they shipped with the TemplateHouse contest template.
`scripts/dither.mjs` reads from here and writes the halftone versions into
`public/resources/images/`, so a re-run always starts from the original and the
dither never compounds on itself.

This folder sits outside `public/`, so nothing here is served.

# Shōwa: four poster studies

Design System 01 and Eigakan now share a Japanese retro print language based on Mood Board 01 pictures 04 Fuji Sunrise, 06 Shiba & Sake, 08 Nouvelle Vague, and 18 Ramen. Picture numbers refer to the interleaved mood board, not the source filenames.

- **Fuji:** broad vermilion disc, deep indigo silhouette, tapered negative-space cuts in the snow. Used in the hero and small section ornament.
- **Shiba:** irregular fur contours, warm paper highlights, dark brush shading and red paper labels. Used in the empty state and illustration blocks.
- **Nouvelle Vague:** cropped graphic silhouette, restrained facial details, expressive red accents and open space. Used in the hero composition and flat headline hierarchy.
- **Ramen:** flowing linework, imperfect concentric rings, straw against blue-green. Used in count badges, radios, selected chips and saved icons.

The existing board palette is retained: cream and straw paper, vermilion action ink, indigo selection ink, Sumi text, brown supporting ink. Paper texture stays subtle under text; heavier wear stays within illustrations. All assets are local. Controls retain 44px touch targets, visible two-color focus rings, accessible names and reduced-motion support.

## Assets

### Reference-derived icon and graphic

Generated with the built-in `image_gen` tool using `public/showa/poster-scene.png` as the style and subject reference. The full final prompts are in `references/showa-asset-prompts.json`.

- `public/showa/shiba-emblem.png`: 1254 × 1254 RGBA master with a transparent background. `shiba-emblem.webp` is a 384 × 384 optimized copy preserving alpha. Used by `ShibaEmblem` in the empty saved list and the design-system asset showcase, including 32/48/64px examples.
- `public/showa/fuji-landscape.png`: 1536 × 1024 landscape master. `fuji-landscape.webp` is a 1200 × 800 optimized copy. Used by `PosterHeroArt landscape` in the movie hero and its applied design-system example.
- The asset showcase in `DrawingKit` provides downloadable PNG masters. Small action and genre glyphs remain SVG so their silhouettes stay legible at control sizes.

The update integrates main through `eee7f7f`, retaining its wrapped genre filters, phone layout fixes, vector drawing studies and footer. The existing reference hero remains on the Shōwa design-system page. The pre-pull local work is also retained in Git's autostash and `/tmp/showa-refinement-backup/`.

### Original reference and print components

- `public/showa/poster-scene.png`: original 1536 × 1024 hero, generated with the built-in image generation tool. Used on the design system and movie pages.
- `public/showa/washi.svg`: reusable code-native paper texture for page backgrounds, printed controls and panels.
- `components/system/showa-print.tsx`: reusable SVG illustration blocks, hero, and source-reference gallery. Small action glyphs live in `icons.tsx` and use filled brush contours without expensive texture filters.

## Generation prompt

Use case: illustration-story. Asset type: original landscape hero artwork for a Japanese retro poster design system and cinema website. Create a polished vintage Japanese lithograph illustration, landscape 3:2 composition. Mount Fuji with jagged dry-brush snow strokes rises behind a huge imperfect vermilion sunset. Foreground right: a relaxed cream Shiba with beautifully brushed fur sits beside a ceramic ramen bowl with flowing noodle lines, red rim, ivory egg and dark seaweed; foreground left: a cropped flat geometric Nouvelle Vague-style feminine profile with black bob, a single vermilion cheek and blue-green collar, integrated as a printed cinema poster leaning against the scene. Keep composition spacious with visual hierarchy, Fuji/sun dominant; supporting subjects small. Match warm cream paper #f3eddd, muted straw #ebcb85, vermilion #c7381c, deep blue-green #1f4a66, sumi #161816 and brown #4e4430. Real screenprinted ink wear, fibrous matte paper, rough broken ink edges, fine engraved hatching mixed with painterly brush strokes, slight plate misregistration. Restrained sophisticated limited ink colors and flat shadow masses, expressive irregular contours. No text, no letters, no logo, no watermark, no gradients or glossy 3D. Leave a warm paper margin around the illustration. This is a new original composition based on these stylistic observations, not a reproduction.

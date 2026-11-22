# CommonRoom 3D character models

Put Mixamo character and animation files in this folder, then list them in `manifest.json`.

## File names

Characters (download "With Skin"):

- `char-maya.fbx`, `char-jordan.fbx`, ... one file per character

Animations (download "Without Skin"; tick "In Place" for Walking):

- `anim-idle.fbx`
- `anim-walk.fbx`
- `anim-wave.fbx`
- `anim-clap.fbx`
- `anim-thumbsup.fbx`
- `anim-hand.fbx`

## manifest.json

```json
{
  "characters": [
    { "id": "maya", "name": "Maya", "file": "char-maya.fbx" },
    { "id": "jordan", "name": "Jordan", "file": "char-jordan.fbx" }
  ],
  "animations": {
    "idle": "anim-idle.fbx",
    "walk": "anim-walk.fbx",
    "wave": "anim-wave.fbx",
    "clap": "anim-clap.fbx",
    "thumbs": "anim-thumbsup.fbx",
    "hand": "anim-hand.fbx"
  }
}
```

Optional per character: `"rotate": 180` if the character faces backward, `"height": 1.7` to change its size, and `"animations": { ... }` to override the shared animations.

When `characters` is empty, the 3D page uses the built-in characters only.

## Characters made outside Mixamo

- `char-alex.glb` (Alex) was built with MakeHuman/MPFB and its CC0 system assets, then given a Mixamo-compatible skeleton so the shared `anim-*.fbx` files above play on it like on the Mixamo characters.

## Build-your-own avatars (`av/`)

`av/m/` and `av/f/` hold the parts students pick from on the start screen: `body.glb` plus one file per hair style, outfit, shoes and hat. All parts share the body's Mixamo-compatible skeleton, so the shared `anim-*.fbx` files play on them. A student's choice is sent as the character id `av-<body>-<hair>-<outfit>-<shoes>-<hat>` (indices into `AVO` in `3d/index.html`); skin tone and hair color reuse the existing Skin and Hair color swatches as tints. Body pieces carry a `hideBy` list so skin under the chosen clothes is hidden. Made with MakeHuman/MPFB and its CC0 system assets.

Female designed avatars use `anim-walk-f.fbx` for walking (set in `AVANIM` in `3d/index.html`); everything else uses the shared animations. Eyebrows (`brows-*.glb`) and eye colors (`eyes-*.glb`) are separate parts too.

Outfits have two materials, `top` and `bottom`, so students can pick a color for each (Top color / Bottom color in the builder; index 0 keeps the original texture). A chosen color is applied in the browser to a gray copy of that garment's texture.

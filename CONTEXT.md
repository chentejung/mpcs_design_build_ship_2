# Design Build Ship — Week 2

A process showcase that goes from mood to system to shipped site: three Mood Boards, one Design System extracted from
each, and the Final Site that ships the Selected Pair.

## Language

### Explore

**Mood Board**:
A collection of 30 pictures (References and Originals) that defines a visual mood, summarised by its Palette.
_Avoid_: Board theme, inspiration set

**Reference**:
A picture on a Mood Board taken from Pinterest.
_Avoid_: Pin, inspiration

**Original**:
A picture on a Mood Board made for it rather than found: generated from an art brief in the board's style
(`references/moodboard-image-prompts.json`).
_Avoid_: Artifact (an Artifact is either a Reference or an Original), original title (see Native Title)

**Palette**:
The six Swatches that best represent all 30 pictures of a Mood Board.

**Swatch**:
One named color in a Palette, with its share of the board's pixels. A Swatch has no role; roles belong to Design Systems.
_Avoid_: Token, color, swatch role

### Define

**Design System**:
The rules extracted from one Mood Board for building a movie list: how its Swatches fill the Color Roles, plus type
roles, spacing and shape, components, control states, UI states, and its texture and motif. Every Design System covers
the same checklist so the three can be compared side by side.
_Avoid_: Theme, style guide, system spec

**Color Role**:
A job a color does in a Design System: Background, Surface, Text, Muted, Border, Accent, On-Accent, Selected, Focus,
Scrim or Error.
_Avoid_: Token, swatch role

### Ship

**Selected Pair**:
The selected Mood Board and the Design System extracted from it, which the Final Site ships.

**Final Site**:
Eigakan 映画館, the movie picker at `/movies`, built with the Selected Pair.
_Avoid_: Demo, live site

**Film**:
One of Eigakan's 25 movies, in exactly one Category.
_Avoid_: Movie item, title

**Category**:
One of the seven fixed genres a Film belongs to: Thriller, Comedy, Animation, Action, Science Fiction, Romance, Horror.
_Avoid_: Genre tag, filter

**Native Title**:
A Film's title in its original language and script, e.g. 七人の侍 for Seven Samurai.
_Avoid_: Original title (an Original is a picture made for a Mood Board)

**Saved List**:
The visitor's ordered shortlist of Films, held only in memory and empty after any full page load.
_Avoid_: Watchlist, favorites

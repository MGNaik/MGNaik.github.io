---
title: "Kaudi Pandit Project Update 3 - AI as a Tutor, Not an Author"
date: 2026-06-13
categories: [general]
tags: [python, programming, portfolio, game, learning]
classes: wide
---

> **DRAFT** — assembled from my working sessions, for me to edit. The quoted
> exchanges are real but trimmed. {{ braces }} mark where I still need to write
> in my own words.

KaudiPandit is a learning project as much as a coding one. The point isn't only to end up with a program that plays the game — it's to become a sharper programmer by the time I'm done building it. That changes how I use AI on it.

In an earlier post I mentioned I'd used various LLMs to help plan the project. For the coding itself I've set a clear rule: AI does not write my code. I use AI as a tutor instead. This post is about what that actually means, with some real excerpts from the sessions.

## The rule

When I started writing the engine, the first thing I did was "snooze" off GitHub Copilot. Not because it was bad — because it was too good. It read my open files and suggested the exact line I was about to type.

At first it was like magic — how does this thing know what I'm thinking? Then it felt dangerous. Not in the sense of the evil Terminator, Singularity, etc. It's dangerous on a much, much shorter horizon.

Using it in that way, or using agentic coding, will rob me of the experience of developing a Python program from a beloved board game. It will rob me of thinking deeply about a game I've played most of my life. It will rob me of the feeling of redemption from failing a programming course at university. The project and the time spent will become a faint memory very quickly.

I'm looking instead for the much richer experience of learning. The right use of AI is to take the things whose doing adds nothing, so I can spend my time on the things that do. This project, as part of my robotics hobby, is the opposite of that — the doing is the whole point.

That leaves the AI doing what a good tutor does: explain a concept when I ask, push back on a design before I commit to it, and think through a problem with me when I'm stuck — not for me. Three examples show what that looks like.

## It explains the concept, then gets out of the way

I needed a type for board coordinates. My instinct was a plain `(row, col)` tuple. I didn't know about NamedTuples — the tutor introduced the idea, explained why it was a better fit, and gave me the reasoning to choose between the two flavours:

> There are two flavours: the classic `collections.namedtuple` (function-call style, older API) and `typing.NamedTuple` (class-style, supports type hints, generally preferred for new code). Use `typing.NamedTuple`.
>
> ```python
> from typing import NamedTuple
>
> class Position(NamedTuple):
>     row: int
>     col: int
> ```
>
> One subtle thing — `Position(6, 3) == (6, 3)` returns `True`. Convenient, but it means you can't use type to tell a position apart from any old 2-tuple.

So this one wasn't me being nudged toward a tool I half-knew — it was a concept I didn't have, handed over with enough context to understand it rather than just paste it. The gotcha at the end is the part that mattered: it's the thing I'd otherwise have tripped over weeks later. I learned what a NamedTuple is and when to reach for one; I still wrote the code myself.

{{ A line on whether knowing that gotcha up front changed how you used Position. }}

## It argues with my design instead of building it

This is the part I find most valuable. I wanted to put `Position` inside `board.py`, since positions are board coordinates and that felt natural. Instead of agreeing, the AI made the case against it:

> If `Position` lives in `board.py`, then everything that uses it has to import from `board` — `Piece`, `Player`, and so on. That's fine until `Board` itself needs to reference `Piece` or `Player`, which it probably will. Then you have a circular import: `board` imports `piece`, `piece` imports `board` for `Position`.
>
> The general rule: primitive types — small, dependency-free building blocks — should live below the classes that use them, not alongside them. `Position` is a primitive: two ints with names, depends on nothing. Putting it in `board.py` forces `board.py` to be imported by everything, which makes it a hub. That's backwards.

The suggestion was a small `types.py` for primitives, and that's what's in the repo now. But the order matters: I came in with an instinct, got shown why it would bite me, learned a rule I can reuse, and then made the decision myself. A tutor that just wrote the file would have produced the same `types.py`, but I'd have the file without the rule. The rule is the part I keep.

## It can be wrong, and I correct it

This is the exchange that convinces me it's a thinking partner and not an oracle I defer to. We were working out what state a `Piece` needs to store. The AI was fairly sure a piece needs to track which lap it's on — sensible, if you're thinking of games like Pachisi where a piece revisits the same squares on later laps:

> Is there a meaningful difference between piece X (lap 1, square 7) and piece Y (lap 3, square 7), or are they truly equivalent? If they're equivalent, board-square alone is enough and the lap concept is a phantom.

I knew the rules and pushed back. In Kauda-Baji the inward loops use different squares, so a piece never revisits a square within one life:

> Me: this is the default path. There are 3 squares that take it inwards. The player can choose to keep going around instead of turning in at each of those, but once that choice is made, the game state doesn't care how the piece got there.

Once it looked at the board diagram, it backed down cleanly:

> You were right and I was wrong. Each board square belongs to exactly one ring, so the lap number is encoded in which ring the square is on — a property of the square itself. Board-square alone is sufficient state. I was carrying a phantom complication from games like Pachisi where laps do revisit squares.

That settled a real design question: a `Piece` stores just its board square, and which ring it sits on tells you how far along it is. The value here wasn't that the AI knew the answer — it didn't, I did. The value was a sparring partner that surfaced the assumption, made me state the rule precisely, and updated when shown the board.

## But won't AI surpass this too?

There's a thought I keep circling back to: if AI can write this kind of code in seconds, hasn't the age of the programmer already ended, replaced by the age of the person who checks and designs what the AI builds? Maybe. But I think that quietly assumes you can be a good checker of code you couldn't have written yourself, and mostly you can't. The circular-import problem above wasn't visible from the outside — you only catch it if you already carry the rule in your head. So the two halves of my worry aren't really in tension: "AI writes this fast" and "learning to code still matters" are both true, and the bridge between them is judgment. The value was never the typing; it was the understanding that lets you read what was built, see how it failed, and know how to make it better. My honest expectation is that AI will surpass me at writing the code, and probably at much of the checking too. But my hunch is that there will always need to be *something* that can look under the plain-English layer at the thing that was actually built — and for now, the only way I know to become that something is to build it by hand first.

## Why bother

It would be faster to let the model write the engine. I'd have a working KaudiPandit in a weekend. But I'd have learned close to nothing, and the learning is the whole reason the project exists. The discipline isn't anti-AI — it's about pointing the AI at the part of the work where it makes me better, not the part where it makes me redundant.

The test I keep coming back to: after a session, can I rederive what we worked out? If it explained dependency direction and I can now spot a circular import coming on my own, the session did its job. If it just produced a `types.py` and I couldn't tell you why, it didn't — however good the file is.

{{ Closing line. Maybe a pointer to the next post, which gets into the board and path code these conversations produced. }}
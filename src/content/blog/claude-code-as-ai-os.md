---
title: "Claude Code as an AI OS"
description: "Exploring how Claude Code represents a paradigm shift in developer tooling, functioning more like an AI-powered operating system than a traditional coding assistant."
publishDate: 2025-06-20
draft: false
---

If you blur your eyes a little bit Claude Code is an AI operating system. It lives on the command line with access to all your UNIX tools like `find`, `grep`, and `ps`. And because it's an LLM it can figure out obscure MacOS commands. I can interact with all of them in natural language.

- Stop the program using the most CPU
- Run the command that enables text selection in Quick Look

I know a terminal isn't what most people imagine when they think about an AI operating system of the future, but the command line feels like the logical place to start.

## Claude Code SDK: A magic UNIX command

The Claude Code SDK (i.e. `claude -p`) is like a magic UNIX program that takes plain text and turns it into something useful. I can pipe in and pipe out of it.

## Workflow

I pretty much always have Claude Code running in a [Ghostty](https://ghostty.org/) window. I've started using `--dangerously-skip-permissions` and treating it like a general purpose, natural langauge Unix prompt.

<div class="photo-gallery">
  <figure>
    <img src="/images/blog/claude-ps-aux.png" alt="Claude Code executing ps aux command">
    <figcaption>Finding resource-intensive processes</figcaption>
  </figure>
  <figure>
    <img src="/images/blog/claude-quick-look.png" alt="Claude Code enabling Quick Look text selection">
    <figcaption>Enabling text selection in Quick Look</figcaption>
  </figure>
</div>

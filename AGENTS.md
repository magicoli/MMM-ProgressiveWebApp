# Agents instructions

## Tone

Adopt a warm, approachable, and direct tone. Use simple, informal language, keep sentences short, and avoid technical jargon. Use no more than one exclamation mark per message and avoid overly formal or stiff expressions. Communicate in the user's language, but always use English for code and documentation.

Prioritize simplicity and efficiency: aim for a quick, functional result without compromising future scalability. The code should be smart enough to handle scaling while focusing solely on current needs.

## Development setup

Follow instructions in `DEVELOPERS.md`.

Projects might run on **remote servers** while developing **locally**.

Before trying to run, restart, or connect to any service to make sure you're targeting the right machine:

1. Check the project's `.env` file — it usually contains the server URL / hostname
2. Check if there is a local development server running before connecting to a remote one
3. Ask if unsure — don't assume the service is reachable at localhost

Do not attempt to start or restart remote services (ComfyUI, dev servers, etc.) from this machine unless explicitly asked and the mechanism is clear.

## Working conventions

### Documentation and comments

- Use English for documentation and comments, whatever language the user speaks
- Use docstrings whenever appropriate for classes, methods, and functions
- Add comments for complex logic or non-obvious code paths. Keep comment short and generic. Do not include development context considerations, motivation, or implementation details.

### Git branches

- Work on the `dev` branch; `master` is stable and public
- Only the user merges dev → master and pushes

### Git commits

- Write short, descriptive imperative messages (English)
- Prefix with `(untested)` when the change hasn't been verified yet; reword after a successful test
- Never claim co-authorship in commit messages or anywhere else
- **Never push to any remote.** Only the user pushes. Never suggest or offer to push either.

### Testing

If a change is committed before testing, mark it `(untested)` so it's easy to find in the log.

### Documentation

- README.md documents the features and usage of the project for the end users
- DEVELOPERS.md documents de how to work on the code
- AGENTS.md or CLAUDE.md contains the rules for AI assistants. If both exist, they should be identical.

Keep them focused on their respective roles.

## Mail / personal assistant access

Use the `personal-assistant` skill if available for generic tools like mail, sending quotes or invoices,...

<laravel-boost-guidelines>
</laravel-boost-guidelines>

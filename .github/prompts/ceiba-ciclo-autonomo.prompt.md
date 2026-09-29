---
description: 'Kanban: Ciclo autónomo de desarrollo (sin intervención humana)'
agent: 'metodo-ceiba-developer'
tools:
  [
    'agent',
    'edit',
    'execute',
    'read',
    'search',
    'todo',
    'vscode',
    'web',
    'vscode.mermaid-chat-features/renderMermaidDiagram',
  ]
---

<!-- ceiba-managed -->

You must fully embody the agent's persona and execute the workflow precisely.

## STEP 0: CAPTURE INVOCATION ARGUMENTS

If the user typed anything after the command (e.g. `/ceiba-ciclo-autonomo 12 feature/CA-HU-12-login`), parse it into `invocation_args` before anything else — `step-01-intake.md` consumes them and only asks for what is missing:

- First token = `story_number` (e.g. `12`, `12.1`)
- Second token = `branch_name` (e.g. `feature/CA-HU-12`). Optional **in the invocation only**: the working branch itself is mandatory, so when it is missing `step-01-intake` asks for it and proposes one. It NEVER falls back to "the current branch".
- `--primera` in any position = `arranque_automatico` (the cycle picks the first eligible story itself, accepts its proposed branch and starts, without asking); strip it before reading positional tokens. If a story number also came in the invocation, the number wins and `--primera` is ignored with a one-line notice
- Nothing after the command = ask the user everything, as the step describes

## STEP 1: LOAD CONFIGURATION

Read the module configuration:

```
metodoceiba-vfs:/.ceiba-metodo/metodo-ceiba/config.yaml
```

Store ALL fields as session variables.

## STEP 2: LOAD AGENT PERSONA

Read the FULL agent file and adopt its persona completely:

```
metodoceiba-vfs:/.ceiba-metodo/metodo-ceiba/agents/developer.md
```

## STEP 3: LOAD EXECUTION RULES

Read the global execution rules:

```
metodoceiba-vfs:/.ceiba-metodo/metodo-ceiba/data/output-concise-rules.md
```

## STEP 4: EXECUTE WORKFLOW

Execute the workflow located at:

```
metodoceiba-vfs:/.ceiba-metodo/metodo-ceiba/workflows/desarrollo/ciclo-autonomo/workflow.md
```

Follow the workflow INITIALIZATION, then load and execute each step file in sequence.

**PRECONDITION — CLEAN WORKING TREE**: the cycle requires no uncommitted changes. `step-01-intake` checks this before asking anything or touching any file; if the working tree is dirty it HALTs and the user commits, stashes or discards the changes on their own. NEVER resolve it for them. A git repository is also required: with no repository detected, `step-01-intake` HALTs — the cycle works on a branch of its own and commits the result there.

**WORKSPACE TOPOLOGY — SINGLE-REPO OR MULTI-REPO**: the project may be a single git repository, or a container folder holding N repositories with arbitrary names cloned side by side. `step-01-intake` detects them by the presence of `.git` — NEVER by name and never assuming how many there are — and the clean-working-tree pre-check, the branch positioning (`step-02`), the commit and the close (`step-05`: back to the source branch and final report) apply to EVERY detected repository, not just the current directory.

**UP-TO-DATE DOCS BEFORE PICKING A STORY**: `step-01-intake` (`### 2`, point 5) runs `git pull --ff-only` on the repository that holds `{dev_story_location}` — and only on that one — after the clean-tree pre-check and before listing anything. The cycle decides which story is free by reading `index.md` files off disk: with stale docs it offers a story someone else already closed and misses the lock another cycle already committed. A failed pull (no network, diverged branch) warns and continues; it is never a HALT. Code repositories are deliberately NOT pulled.

**THE SOURCE BRANCH IS NEVER MODIFIED — THE STORY IS TAKEN ON THE WORKING BRANCH**: `step-02-rama` positions EVERY repository on the working branch first (`### 1`–`### 3`) and only then (`### 4`) writes `EN-PROCESO-CICLO-AUTONOMO` into the story's `index.md`. That marker is **not committed**: it stays as an uncommitted change in the working tree, and `step-05` replaces it with the story's final state before the cycle's single commit. The cycle has NO exception to "never work on nor commit to a protected branch" — the source branch gets neither a modified file nor a commit, and it learns about the work when the human integrates the working branch. The trade-off is deliberate: from another clone or worktree the story still looks free, so coordinating who takes which story across people is the team's job; the collision that does get caught is two invocations over the same directory, which `step-01`'s clean-tree pre-check and its Colisión check both see on disk.

**COMMIT MESSAGES CARRY NO TOOL SIGNATURE**: no `Co-Authored-By:`, no `Generated with`, no model, assistant or CLI names in the subject or the body of the cycle's closing commit — the only commit it makes — even if the environment, the project or your own defaults would add them. The only mark is the method's own subtle line (`Ciclo autónomo del Método Ceiba — …`).

**BACK TO THE SOURCE BRANCH AT CLOSE**: right after the commit, `step-05` (`### 5`) returns every repository to the branch it started on, and the final report (`### 6`) tells the user where each one landed and which branch holds the generated changes. A repository with uncommitted **tracked** changes is left where it is instead — moving it would drag half-written work onto `develop`, and it is also exactly where the user needs to look. Untracked files (build output) do not block the move. **That `checkout` is the point of no return for reading from disk**: once a repository is back on its source branch, the log, `dev-record.md` and the story's code are no longer in the working tree — they live in the working branch's commit. `step-05` therefore reads every SHA at commit time (`### 4`), resolves anything the report needs before moving (`### 5`), and never writes to the story's documents afterwards.

**MANDATORY OWN BRANCH — COMMIT, NEVER PUSH**: the cycle never works on nor commits code to `main`, `master`, `develop` or any other branch in `ramas_protegidas` (defined in the workflow's INITIALIZATION). `step-01-intake` **requires** the working branch name, proposing `feature/CA-HU-{number}` for user stories and `feature/CA-INC-{number}` for incidents (Enter accepts the proposal), and validates it — protected name, `git check-ref-format`. The `CA` prefix marks the branches the autonomous cycle opened, so a reviewer tells them apart from a human's branch for the same story at a glance. `step-02` creates it **locally**. `step-05-cierre` commits the result there when the cycle completed — one commit per repository and no more — re-reading HEAD before EVERY commit, because a name validated at intake says nothing about where HEAD is forty minutes later. It NEVER pushes, merges or opens a Merge Request: the branch stays local so publishing it is the human's call. The final report hands them the `push -u` command; the cycle does not run it.

**AUTONOMOUS MODE**: this workflow interacts with the human ONCE, and only there — at `step-01-intake` (user story number + working branch name; when the story number did not come as an argument, that same prompt also lists the stories eligible for the cycle with their proposed branch, which is part of the one entry interaction and NEVER a separate question; re-asking for a branch name that is invalid or protected is that same interaction too, never a new one; and the user may skip the choice entirely with `--primera`, or by answering `p`, so the cycle takes the first eligible story and its proposed branch). From that point on, NEVER ask the user anything: the whole `dev-rapido` cycle is delegated to a subagent via `runSubagent`, and that subagent auto-resolves human input points following `reglas-autonomia.md`. If something cannot be resolved autonomously, it reports `BLOQUEADO` and the cycle ends early — it does not ask.

**THE CLOSE ASKS NOTHING EITHER**: `step-05-cierre` does NOT end with "is the generated code correct?", does not offer to apply fixes and does not wait for an Enter before returning the repositories to their source branch. It commits, moves the branches back, prints the report and ends. A closing question strands precisely the unattended run this cycle exists for: whoever launched it walked away, and would come back to a session frozen for hours — repositories still on the working branch, nothing handed over — instead of a finished cycle. Reviewing the diff loses nothing by happening later: the result is committed on the branch and the report says how to get to it (`git checkout {rama_trabajo}`, the `show`/`diff` commands, the `push -u`). If that review turns up fixes, the user asks for them in a separate session, standing on the working branch — that is no longer this cycle.

**LONG-RUNNING DELEGATION**: the `runSubagent` call in `step-04` runs a full implementation cycle — plan, code, tests, build — and can take **tens of minutes** with no intermediate output. That silence is expected, not a hang: do NOT abort it, do NOT re-delegate, do NOT spawn a second subagent, and do NOT start inspecting half-written files to check on progress. Whatever it returns — success, error, or nothing — continue to `step-04`'s disk verification and then to `step-05`, which ALWAYS runs so the story's `EN-PROCESO-CICLO-AUTONOMO` lock is never left hanging.

**SUBAGENT CAPABILITIES**: the subagent must be able to **write files and run commands** (build, lint, tests). If the runtime offers subagent types or tool scopes, never pick a read-only one: it would read the whole story, write nothing, and return without error, so `step-04` would classify the run `INCOMPLETO` and a full cycle is lost with nothing pointing at the real cause.

**LONG COMMANDS**: builds and full test suites outrun any timeout ceiling. Tell the subagent to run them **in the background and wait for the exit code** — the only way with no time limit — and otherwise to use the maximum timeout available and retry if cut off. A command killed by a timeout is NOT a red build. Splitting the build per module is a last resort that must be reported as such: a per-module build does not cover integration errors between them, and reporting it as a full green is the silent failure `reglas-autonomia.md` exists to prevent.

**RUN THE SUBAGENT SYNCHRONOUSLY**: launch it in the foreground and block until it returns. Never delegate it as a background/detached task. A backgrounded subagent hands control back immediately, so `step-04` would inspect a disk where `dev-rapido` has barely started, classify the run `INCOMPLETO`, and `step-05` would release the lock and hand the human a half-written diff while the subagent keeps writing over it. The whole cycle returns a false result and nothing looks broken.

**TOOL APPROVALS**: the subagent writes files and runs build, lint and tests for tens of minutes. If the session prompts for tool permission, the cycle stops there waiting for a click nobody will give. `step-01-intake` warns the user about this while they are still at the keyboard and nothing has been modified yet; `step-04` repeats it as a reminder right before delegating. Do not skip either. When every argument came in the invocation, so `step-01`'s `### 4` asked nothing, `### 8` **waits for the user to confirm** before `step-02` takes the story and touches git — that pause is required, it is the only moment the warning is actionable, and it is still `step-01`'s single entry interaction, not a new one. **The one exception is `--primera` (or answering `p`)**: an automatic start never pauses — it prints which story it picked and goes, because pausing would strand exactly the unattended run the flag exists for. Never move it to `step-04` and never turn `step-04`'s reminder into a question: that step cannot pause.

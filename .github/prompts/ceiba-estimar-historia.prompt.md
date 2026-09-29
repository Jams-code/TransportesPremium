---
description: 'Kanban: Estimar historia o incidente (Método Ceiba)'
agent: 'metodo-ceiba-developer'
tools: ['agent', 'edit', 'execute', 'read', 'search', 'todo', 'vscode', 'web', 'vscode.mermaid-chat-features/renderMermaidDiagram']
---

<!-- ceiba-managed -->

You must fully embody the agent's persona and execute the workflow precisely.

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
metodoceiba-vfs:/.ceiba-metodo/metodo-ceiba/workflows/desarrollo/estimar-historia/workflow.md
```

Follow the workflow INITIALIZATION, then load and execute each step file in sequence. If context files are attached via #file:, use them to answer prompts automatically when possible.

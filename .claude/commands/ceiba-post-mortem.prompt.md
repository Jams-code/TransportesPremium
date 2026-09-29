<!-- ceiba-managed -->
﻿# Kanban: Post-mortem de incidente

You must fully embody the agent's persona and execute the workflow precisely.

## STEP 1: LOAD CONFIGURATION
Read the module configuration:
```
{project-root}/.ceiba-metodo/metodo-ceiba/config.yaml
```
Store ALL fields as session variables.

## STEP 2: LOAD AGENT PERSONA
Read the FULL agent file and adopt its persona completely:
```
{project-root}/.ceiba-metodo/metodo-ceiba/agents/architect.md
```

## STEP 3: LOAD EXECUTION RULES
Read the global execution rules:
```
{project-root}/.ceiba-metodo/metodo-ceiba/data/output-concise-rules.md
```

## STEP 4: EXECUTE WORKFLOW
Execute the workflow located at:
```
{project-root}/.ceiba-metodo/metodo-ceiba/workflows/soporte/post-mortem/workflow.md
```

Follow the workflow INITIALIZATION, then load and execute each step file in sequence. If context files are attached, use them to answer prompts automatically when possible.

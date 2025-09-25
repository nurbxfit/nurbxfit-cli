#!/usr/bin/env node

import { say } from "./utils/say";

say.info("Starting project setup...");
say.success("Project created successfully!");
say.warn("Using fallback option...");
say.error("Something went wrong!");
#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { buildSass } from "./styles.ts";

buildSass();
await dev(import.meta.url, "./main.ts");

/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference types="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

await start(manifest);

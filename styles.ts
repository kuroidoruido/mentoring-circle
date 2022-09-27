import sass from "sass";

export function buildSass() {
  const compile = sass(["./styles/index.scss"], {
    quiet: true,
    style: "compressed",
  });
  const maybe_str = compile.to_string();
  const data = `/* DO NOT EDIT. This file is generated. */\n${extractStyles(
    maybe_str
  )}`;
  Deno.writeTextFileSync("./static/styles.min.css", data);
}

function extractStyles(maybe_str: string | false | Map<string, string>) {
  if (!maybe_str) {
    return "";
  } else if (typeof maybe_str === "string") {
    return maybe_str;
  } else {
    return maybe_str.get("index");
  }
}

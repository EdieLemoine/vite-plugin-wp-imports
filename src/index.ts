import { type Plugin } from "vite";

const NAME = "wp-imports";

const IMPORT_REGEX =
  /import\s*{([^}]+)}\s*from\s*['"]@wordpress\/([^'"]+)['"];/g;
const IMPORT_NAMESPACE = "@wordpress/";

export const wpImports = (): Plugin => ({
  name: NAME,
  enforce: "pre",
  transform(code) {
    if (!code.includes(IMPORT_NAMESPACE)) return null;

    let newCode: string = code;
    let match: RegExpExecArray | null;

    while ((match = IMPORT_REGEX.exec(code))) {
      const imports = match[1].split(",").map((item) => item.trim());
      const wpModule = match[2];

      // Remove the import statement
      newCode = newCode.replace(match[0], "");

      // Replace all instances of the imported variables with global `wp` object usage
      imports.forEach((item) => {
        const globalReplacement = `wp.${wpModule}.${item}`;
        const usageRegex = new RegExp(`\\b${item}\\b`, "g");

        newCode = newCode.replace(usageRegex, globalReplacement);
      });
    }

    return { code: newCode, map: null };
  },
});

export default wpImports;

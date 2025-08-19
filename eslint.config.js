const { FlatCompat } = require("@eslint/eslintrc");
const prettier = require("eslint-plugin-prettier");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  { ignores: ["**/_generated"] },
  ...compat.extends("prettier", "plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      prettier,
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "prettier/prettier": ["error"],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
];

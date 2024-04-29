import globals from "globals";

export default [
    {
        languageOptions: {
            sourceType: "module",
            globals: {
                poopy: "writable",
                ...globals.browser
            }
        }
    }
];
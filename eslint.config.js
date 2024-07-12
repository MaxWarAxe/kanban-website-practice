import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginAirbnb from "@vue/eslint-config-airbnb-with-typescript";

export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    plugins: {
      airbnbConfig : pluginAirbnb
    }
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2024,
      },
    }
  },
  
    
  
];
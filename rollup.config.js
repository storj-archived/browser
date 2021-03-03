import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import vue from "rollup-plugin-vue";

import packageJson from "./package.json";

export default {
  input: "src/wrapper.js",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true
    },
    {
      format: "esm",
      file: packageJson.module,
      sourcemap: true
    }
  ],
  plugins: [
      // peerDepsExternal(),
     // resolve({
     //    
    //  }),
      css(),
      vue({
        css: false
      })
    //  commonjs({
   //     include: /node_modules/
   // })
    ]
};
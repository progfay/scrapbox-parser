import path from "node:path";

export default {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    path: path.resolve(import.meta.dirname, "umd"),
    filename: "scrapbox-parser.js",
    library: "ScrapboxParser",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.umd.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

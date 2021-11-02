module.exports = {
  entry: ['./src/index.ts'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ],
  },  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};


module.exports = {
  entry: ['./src/index.ts'],
  mode: 'development',
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


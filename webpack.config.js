const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	devtool: "inline-source-map",
	entry: './src/Index.tsx',
	output: {
		path: `${__dirname}/dist`,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: ['style-loader', 'css-loader']
		}]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html' },
		])
	],
}

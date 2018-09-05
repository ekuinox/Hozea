const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: process.env.WEBPACK_ENV,
	devtool: process.env.WEBPACK_ENV == 'development' ? "inline-source-map" : undefined,
	entry: './src/Index.tsx',
	output: {
		path: `${__dirname}/dist`,
		filename: 'bundle.js',
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
		new HtmlWebpackPlugin({
			title: "Hozea",
			template: "./src/index.html"
		})
	],
}

const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.WEBPACK_ENV == undefined ? 'development' : process.env.WEBPACK_ENV

module.exports = {
	mode: env,
	devtool: env == 'development' ? "inline-source-map" : undefined,
	entry: {
		'renderer': './src/renderer/Index.tsx',
		'main': './src/main/Main.ts'
	},
	output: {
		path: `${__dirname}/dist`,
		filename: '[name].bundle.js',
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
			inject: false,
			template: "./src/index.html"
		})
	],
	target: 'electron-renderer'
}

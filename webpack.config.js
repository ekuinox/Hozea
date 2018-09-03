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
			use: {
				loader: 'babel-loader',
				options: {
					"presets": [
						["@babel/preset-env", {
							"targets": {
								"browsers": ["last 2 versions"]
							}
						}],
						"@babel/preset-react",
						"@babel/preset-typescript"
					],
					"plugins": [
						["babel-plugin-module-resolver", {
							"extensions": [".js", ".jsx", ".ts", ".tsx"],
							"root": ["./src"]
						}]
					]
				}
			}
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

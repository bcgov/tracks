const path = require('path');
const {merge} = require('webpack-merge');
const {commonConfig} = require('./webpack.common');
require('dotenv').config()

const config = merge(commonConfig({
	filename: 'index.html',
	templateParameters: {},
	template: path.resolve(__dirname, 'templates/main.html'),
}, {
	source: 'Webpack',
	defines: {
		_DEBUG: JSON.stringify(true),
		_API_BASE: JSON.stringify(process.env['API_BASE']),
		_KEYCLOAK_CLIENT_ID: JSON.stringify(process.env['KEYCLOAK_CLIENT_ID']),
		_KEYCLOAK_REALM: JSON.stringify(process.env['KEYCLOAK_REALM']),
		_KEYCLOAK_URL: JSON.stringify(process.env['KEYCLOAK_URL']),
	}
}), {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		liveReload: false,
		magicHtml: false,
		static: {
			directory: path.join(__dirname, 'public/build'),
		},
		historyApiFallback: true,
		compress: false,
		port: 3000,
	},
	cache: {
		compression: 'gzip',
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, '.node-build-cache'),
		name: 'build-cache',
		maxAge: 43200000,
	},
});

module.exports = config;

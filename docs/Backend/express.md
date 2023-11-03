# express

## `express` 中如何使用 `async/await`
```js
const express = require('express');
const app = express();
const fs = require('fs');
function readFileAsync(filepath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filepath, function (err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(JSON.parse(data.toString()));
		});
	});
}
const Layer = require('express/lib/router/layer');
Object.defineProperty(Layer.prototype, 'handle', {
	enumerable: true,
	get() {
		return this.__handle;
	},
	set(fn) {
		if (fn.length === 4) {
			this.__handle = fn;
		} else {
			this.__handle = (req, res, next) =>
				Promise.resolve(fn(req, res, next)).catch(next);
		}
	},
});
app.get('/', async (req, res, next) => {
	const data = await readFileAsync('./test2.json');
	res.send(data.worlds);
});
// Error Handler
app.use(function (err, req, res, next) {
	console.error('Error:', err);
	res.status(500).send(err.message);
});
const server = app.listen(3000, () => {
	let port = server.address().port;
	console.log(`server is running on port ${port}`);
});
```
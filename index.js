const express = require("express");
const path = require("path");
const app = express();

const port = 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 这时可将public文件看成web服务的根目录
app.use(express.static(path.resolve(__dirname, "./public")));

// 自己实现一个中间件，中间件其实就是一个函数，携带者 req | res | next 这三个参数的函数
// 1. 定义这样的一个中间件函数出来
const logger = (req, res, next) => {
	console.log(`请求的ip地址是：${req.ip}, 请求的路径是：${req.url}, 请求的时间是：${new Date().getTime()}`);
	next();
};
// 2. 使用 server.use() 调用这个中间件 use 方法需要接受的是一个携带了 req| res| next 的函数
//在这个代码后面的请求都能使用上这个中间件
// app.use(logger);

// Home route
app.get("/", (req, res) => {
	// res.send("Hello!");
});

// Mock API
app.get("/users", (req, res) => {
	res.json([
		{ name: "William", location: "Abu Dhabi" },
		{ name: "Chris", location: "Vegas" },
	]);
});

app.post("/user", (req, res) => {
	const { name, location } = req.body;
	console.log(req.body);
	res.send({ status: "User created", name, location });
});

// Listen on port 5000
app.listen(port, () => {
	console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

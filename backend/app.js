import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routers/authRouter.js";
import userRoute from "./routers/userRouter.js";
import bankRoute from "./routers/bankRouter.js";
import campRoute from "./routers/campRouter.js";




const app = express();
const port = 3177;

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: [
			"http://localhost:3000",
		],
		credentials: true,
	})
);


mongoose.connect(process.env.CONNECT, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useFindAndModify: false, 
	useCreateIndex: true }, (e) => {
	console.log(e ? e : "Connected successfully to database");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/bank", bankRoute);
app.use("/camps", campRoute);

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);
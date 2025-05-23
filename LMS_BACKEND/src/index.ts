import express from "express";
import { AppDataSource } from "./config/data-source";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import tutorRouter from "./routes/tutor.routes";
import studentRouter from "./routes/student.routes";

const app=express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/tutor', tutorRouter);
app.use('/student', studentRouter);

const PORT=3003;
AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});

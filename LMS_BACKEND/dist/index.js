"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const tutor_routes_1 = __importDefault(require("./routes/tutor.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/admin', admin_routes_1.default);
app.use('/tutor', tutor_routes_1.default);
app.use('/student', student_routes_1.default);
const PORT = 3003;
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});

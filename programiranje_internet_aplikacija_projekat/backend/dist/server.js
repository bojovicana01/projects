"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const universal_router_1 = __importDefault(require("./routers/universal.router"));
const ucenik_router_1 = __importDefault(require("./routers/ucenik.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const nastavnik_router_1 = __importDefault(require("./routers/nastavnik.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '4mb' }));
//app.use(express.json());
// konekcija sa bazom
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekatPIA1');
const conn = mongoose_1.default.connection;
conn.once("open", () => {
    console.log("DB ok");
});
// postavka rutera
const router = express_1.default.Router();
router.use('/universal', universal_router_1.default);
router.use('/ucenik', ucenik_router_1.default);
router.use('/nastavnik', nastavnik_router_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

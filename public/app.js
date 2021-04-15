"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const enumDreamTypes_1 = require("./helpers/enumDreamTypes");
const dreamRoutes = require('./routes/dreamRoutes');
const app = express_1.default();
dotenv_1.default.config();
// Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Connection to a db
const port = 3000;
const dbConnect = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
mongoose_1.default.connect(dbConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Connected to dreams');
    app.listen(port);
}).catch(err => {
    console.log(err);
});
// Getting dream types values in array
app.get('/dreamTypes', (req, res) => {
    console.log('dreaming sad or happy dreams?');
    let dreamTypesArr = [];
    for (let i in enumDreamTypes_1.enumDreamTypes) {
        if (typeof enumDreamTypes_1.enumDreamTypes[i] === 'number') {
            dreamTypesArr.push(i);
        }
    }
    res.send(dreamTypesArr);
});
// Routes
app.use('/dreams', dreamRoutes);

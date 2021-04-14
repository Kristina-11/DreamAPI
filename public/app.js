"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const dreamTypes_1 = require("./helpers/dreamTypes");
const app = express_1.default();
dotenv_1.default.config();
// Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Connection to a db
const port = process.env.PORT || 8080;
const dbConnect = `mongodb+srv://${process.env.DB_CONNECTION}`;
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
    for (let i in dreamTypes_1.dreamTypes) {
        if (typeof dreamTypes_1.dreamTypes[i] === 'number') {
            dreamTypesArr.push(i);
        }
    }
    res.send(dreamTypesArr);
});

import express, {Application} from "express";
import config from "../config/config";
import cors from 'cors';
import calc from "../routes/calc.route";

export class App {
    private readonly app: Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = config.common.port;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors({ origin: "http://localhost:3000" }));
        this.app.use("/calc", calc);
    }

    start() {
        this.app.listen({ port: this.port }, () =>
            console.log(`Server ready at http://localhost:${this.port}`)
        );
    }


}

import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config/Contants";
export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            console.log("data base conected");
        } catch (error) {
            console.error(error.message);
        }
    }
}

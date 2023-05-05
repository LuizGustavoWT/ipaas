import 'dotenv/config';
import {connectMongoDB, server} from "./shared/infra/http/server";

server.listen({port: 3000, host: process.env.HOST || '0.0.0.0'}, async (err, address) => {
    try {
        await connectMongoDB();
    } catch (error) {
        err = error;
    }
    if (err) {
        console.error(err);
    }
    console.log(`Server listening at ${address}`);
});
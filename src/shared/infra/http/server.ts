import * as mongoose from 'mongoose';
import fastify from "fastify";
import {RequestTemplateModel} from "../../../domain/requestTemplate/infra/db/mongo/schema/RequestTemplate";
export async function connectMongoDB() {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL || '');
    mongoose.set('autoIndex', true);
    mongoose.set('autoCreate', true);
    mongoose.set('strictQuery', true);
}

const server = fastify();

server.get('/', async (request, reply) => {
    const model = await RequestTemplateModel.find()

    var url: string = "https://brasilapi.com.br/api/cep/v2/{cep}"

    url = url.replace(model[0].template, "01001000")
    try {
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        var data = await response.json();

        reply.status(200).send({response: data});
    } catch (error) {
        console.error(error);
    }


})

server.get('/create', async (request, reply) => {
    try {
        const modelo = await RequestTemplateModel.create({
            type: "namedParams",
            template: "{cep}",
        })
    } catch (error) {
        console.error(error);
    }
    reply.status(200).send({message: 'modelo'});
})

server.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply.status(500).send({error: "Internal Server Error"});
});


export {server};


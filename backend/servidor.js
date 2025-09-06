import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import EncurtadorSchema from './EncurtadorDeLink.js';
import { nanoid } from 'nanoid';



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
dotenv.config();

const ConectarAoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('conectado ao mongoDB')
    }
    catch (error) {
        console.log('deu erro ano conectar ao DB', error)
    }
};

ConectarAoDB();







app.post('/AdicionarLink', async (req, res) => {

    const { linkLongo } = req.body;
    let pequenoId = nanoid(6)


    const NovoLink = await EncurtadorSchema.create({
        linkLongo,
        pequenoId
    });

    res.json({
        pequenoUrl: `http://localhost:3000/${pequenoId}`,
        data: NovoLink
    });

});






app.get('/:pequenoId', async (req, res) => {
    const { pequenoId } = req.params;


    const Links = await EncurtadorSchema.findOne({ pequenoId });
    console.log('aqui tá o pequenoId : ', pequenoId);

    if(!Links) return res.status(404).send('O link não existe')

    res.redirect(Links.linkLongo);
    console.log('aqui tá o originalUrl : ',Links.linkLongo);

}); //o get é ativado, mas vem undefined quando clicamos no link encurtado







app.listen(PORT, () => { console.log('o servidor está rodando na porta ', PORT) })


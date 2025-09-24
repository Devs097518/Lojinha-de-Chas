import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import itensSchema from './ModeloItem.js';
import cors from 'cors';
const app = express()


app.use(cors());
app.use(express.json());


const conectarAoBD = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado ao banco de dados!!!')
    }
    catch(error){
        console.log('Teve erro ao conectar ao banco de dados', error)
    }
}

conectarAoBD();


// app.post("/users", async (req, res) => {
//   const { nome, idade } = req.body; // pega os dados enviados
//   await client.db("minhaDB").collection("users").insertOne({ nome, idade });
//   res.json({ message: "Usuário criado com sucesso!" });
// });



app.post('/post' , async (req,res) => {
    try{
        const novoItem = await itensSchema.create(req.body)
    }
    catch(error){
        console.log('Erro ao usar o create',error)
    }
});


app.get('/acessar' , async (req,res) => {
    try{
        const totalItens = await itensSchema.find()
        res.json(totalItens)

    }
    catch(error){
        console.log('Erro ao usar o read',error)
    }
});



// app.put('/post/:id' , async (req,res) => {
//     try{
//         const atualizar = await itensSchema.findByIdAndUpdate(
//             req.params.id ,
//             req.body,
//             {new:true}
//         );
//         res.json(atualizar);

//     }
//     catch(error){
//         console.log('Erro ao usar o read',error)
//     }
// });


app.put('/post/:id/adicionar' , async (req,res) => {
    try{
        const atualizar = await itensSchema.findByIdAndUpdate(
            req.params.id ,
            { $push: {sacola : req.body}} ,
            {new:true}
        );
        res.json(atualizar);
    }
    catch(error){
        console.log('Erro ao usar o read',error)
    }
});



app.delete('/post/:id' , async (req,res) => {
    try{
        const deletar = await itensSchema.findByIdAndDelete(
            req.params.id
            );

        res.json(deletar);

    }
    catch(error){
        console.log('Erro ao usar o read',error)
    }
});


app.listen(3000 , () => {console.log('Servidor rodandando na porta 3000')})

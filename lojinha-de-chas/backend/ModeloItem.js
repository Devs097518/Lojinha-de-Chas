import mongoose from 'mongoose';

/*
obs: o que agora são o email e senha, antes eram nome e descricao
    |
*/

const itensSchema = new mongoose.Schema({
    identificador:String,
    email:String,
    senha:String,
    sacola: [
        {   
            nome:String,
            imagem:String,
            propriedades:String,
            descricao:String,
            valor:Number
        }
    ]
});

export default mongoose.model('UserItem', itensSchema);

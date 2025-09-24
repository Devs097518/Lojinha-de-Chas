import mongoose from 'mongoose';

const itensSchema = new mongoose.Schema({
    identificador:String,
    nome:String,
    descricao:String,
    sacola: [
        {
            produto:String,
            valor:Number
        }
    ]
});

export default mongoose.model('UserItem', itensSchema);

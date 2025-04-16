import mongoose from 'mongoose';
import { autorSchema } from '../models/Autor.js';

const livroSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Types.ObjectId },
        titulo: { type: String, required: [true, 'O campo título é obrigatório!' ] },
        editora: { type: String, required: [true, 'O campo editora é obrigatório!' ] },
        preco: { type: Number },
        paginas: { type: Number },
        autor: autorSchema,
    },
    { versionKey: false }
);

const livro = mongoose.model('livros', livroSchema);

export default livro;

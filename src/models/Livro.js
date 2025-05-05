import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Types.ObjectId },
        titulo: {
            type: String,
            required: [true, 'O campo título é obrigatório!'],
        },
        editora: {
            type: String,
            required: [true, 'O campo editora é obrigatório!'],
            enum: {
                values: ['Casa do Codigo', 'Alura'],
                message: '{VALUE} não é uma editora valida!',
            },
        },
        preco: { type: Number },
        paginas: {
            type: Number,
            min: [10, 'O livro deve ter no mínimo 10 páginas! Valor fornecido: {VALUE}'],
            max: [5000, 'O livro deve ter no máximo 5000 páginas! Valor fornecido: {VALUE}'],
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'autores',
            required: [true, 'O campo autor é obrigatório!'],
        },
    },
    { versionKey: false }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;

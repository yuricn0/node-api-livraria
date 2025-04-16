import mongoose from 'mongoose';

async function conectaBD() {
    await mongoose
        // eslint-disable-next-line no-undef
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log(
                'Conexão com o banco de dados estabelecida com sucesso!'
            );
        })
        .catch((error) => {
            console.error('Erro na conexão com o banco de dados', error);
        });

    return mongoose.connection;
}

export default conectaBD;

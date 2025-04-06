module.exports = {
    dialect: "postgres",
    host: "localhost", //Aonde seu postgres está rodando
    username: "postgres", //Usuário que você utiliza para conectar no postgres
    password: "secret",
    database: "nodejs", //Nome do banco de dados que foi criado
    define: {      //configuração especifica do Sequelize
        timestamp: true, // cria duas colunas: createAt e updateAt. createAt - indica qual é a hora e a data de um determinado registro na tabela
                        //updateAt - A coluna que vai indicar quando que o registro foi atualizado
        
        underscored: true, //nomenclatura _ (não camelCase)
        underscoredAll: true, //Se aplicar para tudo
    },
};
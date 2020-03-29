const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('post/ONG', ()=>{
    // Função que será executada antes para criação das migrations no banco de teste
    beforeEach(async () => {
        // executando as migrations
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    // Após acabar todos os testes
    afterAll(async () => {
        await connection.destroy();
    })
    it('valida a criação de uma nova ONG!', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "ONG TESTE 01",
            email: "teste@tes.com",
            whatsapp: "11963112388",
            city: "Rio Do Sul",
            uf: "SC"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})
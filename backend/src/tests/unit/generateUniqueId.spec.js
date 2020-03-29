const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique Id', () => {
    it('gerando uma chave unica do ID e validando se a mesma possui 8 caracteres', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })
});
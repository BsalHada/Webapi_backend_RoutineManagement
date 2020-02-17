// use the path of your model
const Batch = require('../models/batch');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/apiTestDB'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('batch  Schema test anything', () => {
// the code below is for insert testing
    it('Add batch testing anything', () => {
        const vehcile = {
            'batch': '22a',
        };
        
        return Batch.create(vehcile)
            .then((pro_ret) => {
                expect(pro_ret.batch).toEqual('22a');
            });
    });


it('to test the update', async () => {

    return Batch.findOneAndUpdate({_id :Object('5e39292753c1ae0c20d37730')}, {$set : {batch:'22a'}})
    .then((pp)=>{
        expect(pp.batch).toEqual('22a')
    })
});

// the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await Batch.deleteMany();
        expect(status.ok).toBe(1);
});

    
})

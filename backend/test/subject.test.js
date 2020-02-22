// use the path of your model
const Subjects = require('../models/subject');
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

describe('Vehicle  Schema test anything', () => {
// the code below is for insert testing
    it('Add Vehicle testing anything', () => {
        const vehcile = {
            'subject': 'Computer',
        };
        
        return Subjects.create(vehcile)
            .then((pro_ret) => {
                expect(pro_ret.subject).toEqual('Computer');
            });
    });


it('to test the update', async () => {

    return Subjects.findOneAndUpdate({_id :Object('5e39292753c1ae0c20d37730')}, {$set : {subject:'Computer'}})
    .then((pp)=>{
        expect(pp.subject).toEqual('Computer')
    })
});

// the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await Subjects.deleteMany();
        expect(status.ok).toBe(1);
});

    
})

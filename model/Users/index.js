const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.delUserById = async function(data) {
    return await this.deleteOne({ _id: data })
    .then(result => {
        if(result.n > 0) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.log('ERROR of delete user!', error);
        return false;
    });
};


generalSchema.statics.updateUserById = async function(id, updateData) {
    return await this.findByIdAndUpdate(id, { $set: updateData }, { runValidators: true })
                .then(result => {
                    if(result) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(error => {
                    console.log('ERROR of update user!', error);
                    return false;
                });
};

const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;
const Mongoose = require('mongoose')

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

export const schema = Mongoose.Schema({
    id: CountedId,
    author: String,
    sugestion: String,
    approved: Boolean,
    reason: String,
    applied: Boolean,

})

export const Model = Mongoose.model('sugestions', schema);

Model.find({ id: { $gt: 0 } }).sort({ id: -1 })
    .then(([first, ...others]:[any]) => {
        if (first)
            counter = first.id + 1;
    });

//export default mongoose.model('sugestions', schema)
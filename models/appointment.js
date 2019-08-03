const mongoose = require('mongoose');


const appointschema = mongoose.Schema({
    appont_id: {
        type: Number,
        required: true,
        unique: true
    },
    vehicle_id: {
        type: Number,

    },
    p_id: {
        type: Number,
        required: true
    },
    host_id: {
        type: String
    },
    check_in: {
        type: String,
    },
    check_out: {
        type: String,
    },
    date: {
        type: String,
    },

    purpose: {
        type: String,
    },
    appoint_time: {
        type: String
    },
    status: {
        type: Number
    },
    user_name: {
        type: String
    },
    location: [{
        loc_id: { type: Number },
        loc_sign_in: { type: String },
        loc_sign_out: { type: String },
    }],
    batch_id: {
        type: Number
    }, 
    appoint_cat: {
        type: String
    }


})


const appointment = module.exports = mongoose.model('appointment', appointschema);

module.exports.addAppointment = function (newappoint, callback) {
    newappoint.save(callback)
}





module.exports.GetBatchByAppointmentId = function (id, callback) {
    const id1 = parseInt(id)
    console.log(id1)
    appointment.aggregate([{ $match: { appont_id: id1 } }, { $lookup: { from: "batches", localField: "batch_id", foreignField: "batch_id", as: "batch" } }], callback)
}


module.exports.getAppointmentdetailsById = function (id, callback) {
    const id1 = parseInt(id)
    console.log(id1)
    appointment.aggregate([{ $match: { appont_id: id1 } },
         { $lookup: { from: "batches", localField: "batch_id", foreignField: "batch_id", as: "batch" } },
         { $lookup: { from: "vehicles", localField: "vehicle_id", foreignField: "vehicle_id", as: "vehicle" } },
         { $lookup: { from: "visitordetails", localField: "p_id", foreignField: "p_id", as: "person" } },
        ], callback)

}


module.exports.getAppointById = function (id, callback) {
    const query = { appont_id: id }
    appointment.find(query, callback);
}

module.exports.getAppointByBatchId = function (id, callback) {
    const query = { batch_id: id }
    appointment.find(query, callback);
}

module.exports.getAppointByPID = function (id, callback) {
    const query = { p_id: id }
    appointment.find(query, callback);
}

module.exports.getAppointListByDate = function (date, status, callback) {

    const query = { date: date, status: { $ne: status } }
    console.log(query)
    appointment.find(query, callback).sort({ $natural: -1 })
}

module.exports.getAppointListBystatusDate = function (date, status, callback) {

    const query = { date: date, status: status }

    appointment.find(query, callback).sort({ $natural: -1 })
}
module.exports.getAppointCountByDate = function (id, callback) {
    console.log(id)
    const query = { date: id }
    appointment.count(query, callback)
}

module.exports.findAppointmentByPId = function (id, date, status, callback) {
    const query = { p_id: id, date: date, status: { $ne: status } }
    appointment.find(query, callback);
}

module.exports.getAppointmentList = function (id, callback) {
    console.log(id)
    appointment.find(callback).skip(10 * (id)).limit(10).sort({ $natural: -1 });

}

module.exports.updateAppointment = function (appoint, callback) {
    

    // Object.keys(appoint).forEach(key => {
    //     if (appoint[key] === undefined) {
    //       delete appoint[key];
    //     }
    //   })

      console.log(appoint)
    appointment.updateOne({ appont_id: appoint.appont_id },
        {
            $set:
            {
                "status": appoint.status,
                "check_in": appoint.check_in,
                "check_out": appoint.check_out,
                "batch_id": appoint.batch_id
            }
        },
        callback
    )
}
// .update(Authors:{$elemMatch:{Slug:"slug"}}, {$set: {'Authors.$.Name':"zzz"}});

module.exports.updateLocation = function (appoint, callback) {
    console.log(appoint.location)

    appointment.updateOne({ appont_id: appoint.appont_id, location: { $elemMatch: { loc_id: appoint.location[0].loc_id } } },
        {
            $set: {
                "location.$.loc_sign_in": appoint.location[0].loc_sign_in
            }
        }, callback)

}


module.exports.getLatestAppointmentId = function (callback) {

    appointment.find(callback).limit(1).sort({ $natural: -1 })
}




module.exports.getAppointByStatus = function (id, callback) {
    const query = { status: id }
    appointment.find(query, callback).sort({ $natural: -1 });;
}

module.exports.getAppointByStatusDate = function (id, date, callback) {
    const query = { status: id, date: date }
    appointment.find(query, callback).sort({ $natural: -1 });
}

// getAppointListCountByDate

module.exports.getAppointCountByDatestatus = function (id, date, callback) {
    const query = { status: id, date: date }
    appointment.count(query, callback)
}
module.exports.getAppointCountByDatestatuscat = function (id, date,cat, callback) {
    console.log(cat)
    const query = { status: id, date: date,appoint_cat:cat }
    appointment.count(query, callback)
}
module.exports. getAppointlistByDatestatuscat = function (id, date,cat, callback) {
    console.log(cat)
    const query = { status: id, date: date,appoint_cat:cat }
    appointment.find(query, callback)
}



module.exports.getAppointListBydateandCat = function (date, cat, callback) {

    const query = { date: date, appoint_cat: cat }

    appointment.find(query, callback).sort({ $natural: -1 })
}
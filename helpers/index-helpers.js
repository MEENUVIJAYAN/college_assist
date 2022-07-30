var db=require('../config/connection')
var objectId = require('mongodb').ObjectId

module.exports = {
    
    addITsyllabus:(data,callback)=>{
        var ID
        db.get().collection('ITsyllabus').insertOne(data, (err)=>{
            if (err) return;
            ID = data._id;
            ID = ID.toString();
            callback(ID)
        })
    },
    getAllITsyllabus:()=>{
        return new Promise(async(resolve,reject)=>{
            let datas =await db.get().collection('ITsyllabus').find().toArray()
            resolve(datas)
        })
    },
    addAnouncement:(anouncement,callback)=>{
        var ID
        console.log(anouncement);
        db.get().collection('anouncements').insertOne(anouncement).then((anouncement)=>{
            ID = anouncement._id;
            // console.log(ID)
            callback(ID)
        })
    },
    // addMarks:(mark,callback)=>{
    //     var ID
    //     db.get().collection('marks').insertOne(mark, (err)=>{
    //         if (err) return;
    //         ID = data._id;
    //         ID = ID.toString();
    //         callback(ID)
    //     })
    // },
    addMarks:(mark,callback)=>{
        var ID
        console.log(mark);
        db.get().collection('marks').insertOne(mark).then((data)=>{
            ID = data._id;
            // console.log(ID)
            callback(ID)
        })
    },

    getMarks:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('marks').find().toArray().then((data)=>{
                console.log('marks data :  ', data);
                resolve(data)
            })
        })
    },
    
    getMarksG:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('marks').find().toArray().then((data)=>{
                console.log('marks data :  ', data);
                resolve(data)
            })
        })
    },
    deleteMarks:(ID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('marks').remove({_id:objectId(ID)}).then((response)=>{
                resolve(response);
                x = 'rejected'
                reject(response)
            })
        })
        
    },

    addAtt:(attend,callback)=>{
        var ID
        console.log(attend);
        db.get().collection('attendance').insertOne(attend).then((data)=>{
            ID = data._id;
            // console.log(ID)
            callback(ID)
        })
    },

    getAtt:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('attendance').find().toArray().then((data)=>{
                console.log('Attendance:  ', data);
                resolve(data)
            })
        })
    },
    
    getAtt75:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('attendance').find({Att1:{ $gt: 75}}).toArray().then((data)=>{
                // console.log('Attendance:', data);
                resolve(data)       
            })
        })
    },
    deleteAtt:(ID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('attendance').remove({_id:objectId(ID)}).then((response)=>{
                resolve(response);
                x = 'rejected'
                reject(response)
            })
        })
        
    },

    getUserMarks:(user)=>{
        return new Promise(async(resolve,reject)=>{
            // console.log(ID);
            
            let umarks = await db.get().collection('marks')
                .find({Username:user}).toArray()
                console.log('yfffffffffffffffffffffffffffffffffffffffffffffff');
                console.log(umarks);
                resolve(umarks)
        })
    },



    getAnounce:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('anouncements').find().toArray().then((data)=>{
                console.log('announcement adata :  ', data);
                resolve(data)
            })
        })
    },
     
    addITtime:(data,callback)=>{
        var ID
        db.get().collection('ITtime').insertOne(data, (err)=>{
            if (err) return;
            ID = data._id;
            ID = ID.toString();
            callback(ID)
        })
    },
    getAllITtime:()=>{
        return new Promise(async(resolve,reject)=>{
            let datas =await db.get().collection('ITtime').find().toArray()
            resolve(datas)
        })
    },
    deleteITsyllabus:(ID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('ITsyllabus').remove({_id:objectId(ID)}).then((response)=>{
                resolve(response);
                x = 'rejected'
                reject(response)
            })
        })
        
    },

    addITtext:(data,callback)=>{
        var ID
        db.get().collection('ITtext').insertOne(data, (err)=>{
            if (err) return;
            ID = data._id;
            ID = ID.toString();
            callback(ID)
        })
    },
    getAllITtext:()=>{
        return new Promise(async(resolve,reject)=>{
            let datas =await db.get().collection('ITtext').find().toArray()
            resolve(datas)
        })
    },
    deleteITtext:(ID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('ITtext').remove({_id:objectId(ID)}).then((response)=>{
                resolve(response);
                x = 'rejected'
                reject(response)
            })
        })
        
    },
//#EEE

addEEEsyllabus:(data,callback)=>{
    var ID
    db.get().collection('EEEsyllabus').insertOne(data, (err)=>{
        if (err) return;
        ID = data._id;
        ID = ID.toString();
        callback(ID)
    })
},
getAllEEEsyllabus:()=>{
    return new Promise(async(resolve,reject)=>{
        let datas =await db.get().collection('EEEsyllabus').find().toArray()
        resolve(datas)
    })
},
addAnouncementEEE:(anouncement,callback)=>{
    var ID
    console.log(anouncement);
    db.get().collection('anouncementsEEE').insertOne(anouncement).then((anouncement)=>{
        ID = anouncement._id;
        console.log(ID)
        callback(ID)
    })
},
getAnounceEEE:()=>{
    return new Promise(async(resolve,reject)=>{
        let datas =await db.get().collection('annoucementsEEE').find().toArray()
        resolve(datas)
    })
},
 
addEEEtime:(data,callback)=>{
    var ID
    db.get().collection('EEEtime').insertOne(data, (err)=>{
        if (err) return;
        ID = data._id;
        ID = ID.toString();
        callback(ID)
    })
},
getAllEEEtime:()=>{
    return new Promise(async(resolve,reject)=>{
        let datas =await db.get().collection('EEEtime').find().toArray()
        resolve(datas)
    })
},
deleteEEEsyllabus:(ID)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection('EEEsyllabus').remove({_id:objectId(ID)}).then((response)=>{
            resolve(response);
            x = 'rejected'
            reject(response)
        })
    })
    
},

addEEEtext:(data,callback)=>{
    var ID
    db.get().collection('EEEtext').insertOne(data, (err)=>{
        if (err) return;
        ID = data._id;
        ID = ID.toString();
        callback(ID)
    })
},
getAllEEEtext:()=>{
    return new Promise(async(resolve,reject)=>{
        let datas =await db.get().collection('EEEtext').find().toArray()
        resolve(datas)
    })
},
deleteEEEtext:(ID)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection('EEEtext').remove({_id:objectId(ID)}).then((response)=>{
            resolve(response);
            x = 'rejected'
            reject(response)
        })
    })
    
},

deleteEEETime:(ID)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection('EEEtime').remove({_id:objectId(ID)}).then((response)=>{
            resolve(response);
            x = 'rejected'
            reject(response)
        })
    })
    
},

//#EEE

    deleteITTime:(ID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('ITtime').remove({_id:objectId(ID)}).then((response)=>{
                resolve(response);
                x = 'rejected'
                reject(response)
            })
        })
        
    }
}
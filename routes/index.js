var express = require('express');
const indexHelpers = require('../helpers/index-helpers');
var router = express.Router();
var dateFormat = require("dateformat");
const pdfService = require('../service/pdf-service');
const userHelpers = require('../helpers/user-helpers');

router.get('/pdf', (req, res, next) => {
  indexHelpers.getMarks().then((data)=>{
 console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data);
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=mark.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),data);
});
});


const verifyLogin = (req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'College Assist' });
// });

router.get('/', function(req, res) {
  indexHelpers.getAnounce().then((anouncement)=>{
    var i = 1
    anouncement.forEach(element => {
      element.index=i
      i++;
    });
    console.log('ftg5gygytttttttttttttthtyth');
    console.log(anouncement);
    res.render('index', {anouncement});
  })
});



router.get('/signup', function(req, res) {
  res.render('signup');
});
router.get('/login1', function(req, res) {
  res.render('login1');
});

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    req.session.loggedIn=true
    req.session.user=response
    res.render('mark')
  })
})
router.post('/login1',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user = response.user
      res.redirect('/student')
    }else{
      req.session.loginErr = "Invalid username or password"
      res.redirect('/login1')
    }
  })
})


router.post('/student', function(req, res) {
  // let ID=req.params.id;
  // console.log('helooooooooooooooooooooooooooooooooo');
  // console.log(ID)
  userData = req.body.Username
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', userData);
  indexHelpers.getUserMarks(userData).then((umarks)=>{
    
    var i = 1
    umarks.forEach(element => {
      element.index=i
      i++;
    });
    console.log('ftg5gygytttttttttttttthtyth');
    console.log(umarks);
    // 
    res.render('student', {umarks});
  })
});


router.get('/login', function(req, res) {
  res.render('login');
});


router.get('/it', function(req, res) {
  res.render('it');
});
router.get('/EEE', function(req, res) {
  res.render('EEE');
});

router.get('/it-user', function(req, res) {
  res.render('it-user');
});





router.post('/loginreq', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password; 
  switch(username) {
    case 'user':
      if(password=='123'){
        req.session.loggedIn=true
        res.render('syladmin');
      }
      else{
        res.render('login', {'loginErr':true})
      }
      break;
    case 'IT':
      if(password=='abc'){
        req.session.loggedIn=true
        res.render('it');
      }
      else{
        res.render('login', {'loginErr':true})
      }
      
      break;
      case 'EEE':
      if(password=='qrs'){
        req.session.loggedIn=true
        res.render('EEE');
      }
      else{
        res.render('login', {'loginErr':true})
      }
      
      break;
      case 'EC':
        if(password=='rts'){
          req.session.loggedIn=true
          res.redirect('/it');
        }
        else{
          res.render('login', {'loginErr':true})
        }
        
        break;

    default:
      res.render('login', {'loginErr':true})
  }
 
  router.get('/syladmin',verifyLogin, function(req, res) {
    indexHelpers. getAllITsyllabus().then((data)=>{
      var link = '/add-syllabusit-pdf'
      var logout1 = true;
      var editable = true;
      req.session.admin= "it";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-syllabus-it/'
        i++;
      });
      console.log(data);
      res.render('syladmin', {data,link,editable,logout1});
    })
  });
  router.post('/add-syllabusit-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addITsyllabus(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/syladmin')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllITsyllabus().then((data)=>{
        var link = '/add-syllabusit-pdf'
        var editable = true;
        var logout1 = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-syllabus-it/'
          i++;
        });
        console.log(data);
        res.render('syladmin', {data,link,editable,logout1,alert:true});
      })
    }
    router.get('/delete-syllabus-it/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteITsyllabus(ID).then((response)=>{
        res.redirect('/syladmin');
      })
    });
    
  });
  // router.get('/card-upload', function(req, res, next) {
  //   // if (req.session.admin=="it") {
  //     var link = "/add-syllabusit-pdf"
  //     var page="/it"
  
   
  //   //  else if((req.session.admin=="csitkm")) {
  //   //   var link = "/add-csitkm-pdf"
  //   //   var page="/csitkm" 
  //   // }
  //   res.render('card', {link,page});
  // });
 

  router.get('/timeadmin',verifyLogin, function(req, res) {
    indexHelpers.getAllITtime().then((data)=>{
      var link = '/add-timeit-pdf'
      var logout1 = true;
      var editable = true;
      req.session.admin= "it";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-time-it/'
        i++;
      });
      console.log(data);
      res.render('timeadmin', {data,link,editable,logout1});
    })
  });
  router.post('/add-timeit-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addITtime(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/timeadmin')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllITtime().then((data)=>{
        var link = '/add-timeit-pdf'
        var editable = true;
        var logout1 = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-time-it/'
          i++;
        });
        console.log(data);
        res.render('timeadmin', {data,link,editable,logout1,alert:true});
      })
    }



    
    router.get('/delete-time-it/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteITTime(ID).then((response)=>{
        res.redirect('/timeadmin');
      })
    });
    
  });
  // router.get('/card-upload1', function(req, res, next) {
  //   // if (req.session.admin=="it") {
  //     var link = "/add-timeit-pdf"
  //     var page="/it"
  
   
  //   //  else if((req.session.admin=="csitkm")) {
  //   //   var link = "/add-csitkm-pdf"
  //   //   var page="/csitkm" 
  //   // }
  //   res.render('card1', {link,page});
  // });

  router.get('/add-anouncement',(req,res)=>{
    res.render('anouncard')
  })
  router.post('/add-announcement',(req,res)=>{
    console.log(req.body)
    indexHelpers.addAnouncement(req.body,(id)=>{
          res.render("it")
        })
      })
      
    })

  router.get('/timeuser', function(req, res) {
    indexHelpers.getAllITtime().then((data)=>{
      var i = 1
      var logout1= true;
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('timeuser', {data,logout1});
    })
  });


  router.get('/textadmin',verifyLogin, function(req, res) {
    indexHelpers.getAllITtext().then((data)=>{
      var link = '/add-textit-pdf'
      var logout1 = true;
      var editable = true;
      req.session.admin= "it";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-text-it/'
        i++;
      });
      console.log(data);
      res.render('textadmin', {data,link,editable,logout1});
    })
  });
  router.post('/add-textit-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addITtext(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/textadmin')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllITtext().then((data)=>{
        var link = '/add-text-pdf'
        var editable = true;
        var logout1 = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-text-it/'
          i++;
        });
        console.log(data);
        res.render('textadmin', {data,link,editable,logout1,alert:true});
      })
    }



    
    router.get('/delete-text-it/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteITtext(ID).then((response)=>{
        res.redirect('/textadmin');
      })
    });
    
  });
 


  router.get('/textuser', function(req, res) {
    indexHelpers.getAllITtext().then((data)=>{
      var logout1= true;
      var i = 1
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('textuser', {data,logout1});
    })
  });
// #markform
router.get('/mark',verifyLogin, function(req, res) {
  indexHelpers.getMarks().then((data)=>{
    var link = '/add-marks-it'
    var logout1 = true;
    var editable = true;
    req.session.admin= "it";
    var i = 1
    data.forEach(element => {
      element.index=i
      element.deleteLink = '/delete-marks-it/'
      i++;
    });
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',data);
    res.render('mark', {data,link,editable,logout1});
  })
});


router.post('/add-marks-it',verifyLogin, function(req, res) {
  var datas=req.body
  console.log('hjx,efskjfg,,,,,,,,,,,,,,,,,,,,,,,,,,,rjfaeryiaurlzjwahgfjgdhgf')
  console.log(datas);
  if (req.body.Username) {
    indexHelpers.addMarks(datas,(id)=>{
      res.redirect("/mark")      
      })
  }
  else{
      indexHelpers.getMarks().then((data)=>{
      var link = '/add-marks-it'
      var editable = true;
      var logout1 = true;
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-marks-it/'
        i++;
      });
      console.log("hjgkuuuuuuuggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
      console.log("helllooooo",data);
      res.render('mark', {data,link,editable,logout1,alert:true});
    })
  }
  router.get('/delete-marks-it/:id',(req,res)=>{
    console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
    let ID=req.params.id;
    console.log(ID)
    indexHelpers.deleteMarks(ID).then((response)=>{
      res.redirect('/mark');
    })
  });
  
});
router.get('/card-upload3', function(req, res, next) {
  // if (req.session.admin=="it") {
    var link = "/add-marks-it"
    var page="/it"

 
  //  else if((req.session.admin=="csitkm")) {
  //   var link = "/add-csitkm-pdf"
  //   var page="/csitkm" 
  // }
  res.render('markform', {link,page});
});

//#attendance

router.get('/attendance',verifyLogin, function(req, res) {
  indexHelpers.getAtt().then((data)=>{
    var link = '/add-Att-it'
    var logout1 = true;
    var editable = true;
    req.session.admin= "it";
    var i = 1
    data.forEach(element => {
      element.index=i
      element.deleteLink = '/delete-Att-it/'
      i++;
    });
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',data);
    res.render('attendance', {data,link,editable,logout1});
  })
});

router.get('/attendance-user', function(req, res) {
  indexHelpers.getAtt().then((data)=>{
    var i = 1
    data.forEach(element => {
      element.index=i
      i++;
    });
    console.log("meeenuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",data);
    res.render('attendance-user', {data});
  })
});




router.get('/attendanceper',verifyLogin, function(req, res) {
  indexHelpers.getAtt().then((data)=>{
    req.session.admin= "it";
    var i = 1
    finalData = []
    data.forEach(element => {
      element.index=i
     if (element.Att1<75){
        finalData.push(element);
     }
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('attendant', {finalData});
  })
});

router.get('/attendanceper1',verifyLogin, function(req, res) {
  indexHelpers.getAtt().then((data)=>{
    req.session.admin= "it";
    var i = 1
    finalData = []
    data.forEach(element => {
      element.index=i
     if (element.Att2<75){
        finalData.push(element);
     }
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('attendant1', {finalData});
  })
});
router.get('/attendanceper2',verifyLogin, function(req, res) {
  indexHelpers.getAtt().then((data)=>{
    req.session.admin= "it";
    var i = 1
    finalData = []
    data.forEach(element => {
      element.index=i
     if (element.Att3<75){
        finalData.push(element);
     }
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('attendant3', {finalData});
  })
});
router.get('/mark1',verifyLogin, function(req, res) {
  indexHelpers.getMarks().then((data)=>{
    req.session.admin= "it";
    var i = 1
    finalData = []
    data.forEach(element => {
      element.index=i
     if (element.Sub1<20){
        finalData.push(element);
     }
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('mark1', {finalData});
  })
});

router.get('/mark11',verifyLogin, function(req, res) {
  indexHelpers.getMarks().then((data)=>{
    req.session.admin= "it";
    var i = 1
    data.forEach(element => {
      element.index=i
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('mark11', {data});
  })
});
router.get('/mark22',verifyLogin, function(req, res) {
  indexHelpers.getMarks().then((data)=>{
    req.session.admin= "it";
    var i = 1
    data.forEach(element => {
      element.index=i
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('mark22', {data});
  })
});

router.get('/mark2',verifyLogin, function(req, res) {
  indexHelpers.getMarks().then((data)=>{
    req.session.admin= "it";
    var i = 1
    finalData = []
    data.forEach(element => {
      element.index=i
     if (element.Sub2<20){
        finalData.push(element);
     }
     i++;
    });
    // console.log('crtvttttttttttttttttttttttttttttttttttttttttt',data);
    res.render('mark2', {finalData});
  })
});




router.post('/add-Att-it',verifyLogin, function(req, res) {
  var datas=req.body
  console.log('hjx,efskjfg,,,,,,,,,,,,,,,,,,,,,,,,,,,rjfaeryiaurlzjwahgfjgdhgf')
  console.log(datas);
  if (req.body.Username) {
    indexHelpers.addAtt(datas,(id)=>{
      res.redirect("/attendance");
      })
  }
  else{
      indexHelpers.getAtt().then((data)=>{
      var link = '/add-Att-it'
      var editable = true;
      var logout1 = true;
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-Att-it/'
        i++;
      });
      console.log("hjgkuuuuuuuggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
      console.log("helllooooo",data);
      res.render('attendance', {data,link,editable,logout1,alert:true});
    })
  }
  router.get('/delete-Att-it/:id',(req,res)=>{
    console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
    let ID=req.params.id;
    console.log(ID)
    indexHelpers.deleteAtt(ID).then((response)=>{
      res.redirect('/attendance');
    })
  });
  
});
router.get('/card-upload4', function(req, res, next) {
  // if (req.session.admin=="it") {
    var link = "/add-Att-it"
    var page="/it"

 
  //  else if((req.session.admin=="csitkm")) {
  //   var link = "/add-csitkm-pdf"
  //   var page="/csitkm" 
  // }
  res.render('attcard', {link,page});
});







  
// #eee
router.get('/EEE-user', function(req, res) {
  res.render('EEE-user');
});


  router.get('/syladmin1',verifyLogin, function(req, res) {
    indexHelpers. getAllEEEsyllabus().then((data)=>{
      var link = '/add-syllabuseee-pdf'
      var editable = true;
      req.session.admin= "EEE";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-syllabus-EEE/'
        i++;
      });
      console.log(data);
      res.render('syladmin', {data,link,editable});
    })
  });
  router.post('/add-syllabuseee-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addEEEsyllabus(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/syladmin1')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllEEEsyllabus().then((data)=>{
        var link = '/add-syllabuseee-pdf'
        var editable = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-syllabus-EEE/'
          i++;
        });
        console.log(data);
        res.render('syladmin', {data,link,editable,alert:true});
      })
    }

    router.get('/delete-syllabus-EEE/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteEEEsyllabus(ID).then((response)=>{
        res.redirect('/syladmin1');
      })
    });
    
  });

  router.get('/card-upload', function(req, res, next) {
    if (req.session.admin=="it") {
      var link = "/add-syllabusit-pdf"
      var page="/it"
    }
   
     else if((req.session.admin=="EEE")) {
      var link = "/add-syllabuseee-pdf"
      var page="/EEE" 
    }
    res.render('card', {link,page});
  });
  router.get('/syluser1', function(req, res) {
    indexHelpers.getAllEEEsyllabus().then((data)=>{
      var i = 1
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('syluser', {data});
    })
  });
  router.get('/syluser2', function(req, res) {
    indexHelpers.getAllEEEsyllabus().then((data)=>{
      var i = 1
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('syluser', {data});
    })
  });
  router.get('/timeadmin1',verifyLogin, function(req, res) {
    indexHelpers.getAllEEEtime().then((data)=>{
      var link = '/add-timeeee-pdf'
      var editable = true;
      req.session.admin= "EEE";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-time-EEE/'
        i++;
      });
      console.log(data);
      res.render('timeadmin', {data,link,editable});
    })
  });
  router.post('/add-timeeee-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addEEEtime(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/timeadmin1')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllEEEtime().then((data)=>{
        var link = '/add-timeeee-pdf'
        var editable = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-time-EEE/'
          i++;
        });
        console.log(data);
        res.render('timeadmin', {data,link,editable,alert:true});
      })
    }



    
    router.get('/delete-time-EEE/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteEEETime(ID).then((response)=>{
        res.redirect('/timeadmin1');
      })
    });
    
  });
  router.get('/card-upload1', function(req, res, next) {
    if (req.session.admin=="it") {
      var link = "/add-timeit-pdf"
      var page="/it"
    }
   
     else if((req.session.admin=="EEE")) {
      var link = "/add-timeeee-pdf"
      var page="/EEE" 
    }
    res.render('card1', {link,page});
  });

  // router.get('/add-anouncementEEE',(req,res)=>{
  //   res.render('anouncard')
  // });
  // router.post('/add-announcementEEE',(req,res)=>{
  //   console.log(req.body)
  //   indexHelpers.addAnouncement(req.body,(id)=>{
  //         res.render("it")
  //       })
  //     });

  router.get('/timeuser1', function(req, res) {
    indexHelpers.getAllEEEtime().then((data)=>{
      var i = 1
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('timeuser', {data});
    })
  });


  router.get('/textadmin1',verifyLogin, function(req, res) {
    indexHelpers.getAllEEEtext().then((data)=>{
      var link = '/add-texteee-pdf'
      var editable = true;
      req.session.admin= "EEE";
      var i = 1
      data.forEach(element => {
        element.index=i
        element.deleteLink = '/delete-text-EEE/'
        i++;
      });
      console.log(data);
      res.render('textadmin', {data,link,editable});
    })
  });
  router.post('/add-texteee-pdf',verifyLogin, function(req, res) {
    var data=req.body
    if (req.files) {
      let now = new Date();
      var x = dateFormat(now, 'dddd, mmmm dS, yyyy');
      data.date = x;
      indexHelpers.addEEEtext(data,(id)=>{
        let reports = req.files.Report
        reports.mv('./public/report/'+id+'.pdf',(err,done)=>{
          if(!err){
            res.redirect('/textadmin1')
          }else{
            
            console.log(err);
          }
        })
       
      })
    }
    else{
        indexHelpers.getAllEEEtext().then((data)=>{
        var link = '/add-texteee-pdf'
        var editable = true;
        var i = 1
        data.forEach(element => {
          element.index=i
          element.deleteLink = '/delete-text-EEE/'
          i++;
        });
        console.log(data);
        res.render('textadmin', {data,link,editable,alert:true});
      })
    }



    
    router.get('/delete-text-EEE/:id',(req,res)=>{
      console.log("yfguujguhoiVHJGHKJLKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH")
      let ID=req.params.id;
      console.log(ID)
      indexHelpers.deleteEEEtext(ID).then((response)=>{
        res.redirect('/textadmin1');
      })
    });
    
  });
  router.get('/card-upload2', function(req, res, next) {
    if (req.session.admin=="it") {
      var link = "/add-textit-pdf"
      var page="/it"
    }
   
     else if((req.session.admin=="EEE")) {
      var link = "/add-texteee-pdf"
      var page="/EEE" 
    }
    res.render('card2', {link,page});
  });


  router.get('/textuser1', function(req, res) {
    indexHelpers.getAllEEEtext().then((data)=>{
      var i = 1
      data.forEach(element => {
        element.index=i
        i++;
      });
      console.log(data);
      res.render('textuser', {data});
    })
  });
  

module.exports = router;

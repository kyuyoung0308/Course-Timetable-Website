const cors = require('cors');
const fs = require('fs');
const express = require('express');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const app = express();
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//setup serving front end code
app.use('/', express.static('static'));

//cors header

app.use(cors());
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });


app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})
*/
//install the router at /api/parts
app.use('/api', router)

//Question 1
router.get('/question1/subjects', (req, res) => {

    var obj = JSON.parse(fs.readFileSync('Lab3-timetable-data.json', 'utf8'));


    var result = [];

    for (var i = 0; i < obj.length; i++) {
        result[i] = JSON.parse(`{"subject": "${obj[i].subject}","className": ""}`);
        result[i].className = obj[i].className;
        console.log(result[i]);
    }

    res.send(result);

});

//Question 2
router.get('/question2/:subjectId', (req, res) => {
    const subjectId = req.params.subjectId
    const courseCodes = []
    var obj = JSON.parse(fs.readFileSync('Lab3-timetable-data.json', 'utf8'));

    obj.forEach((codes) => {
        if (codes.subject.toString().toLowerCase() === subjectId.toString().toLowerCase()) {
            courseCodes.push(`{"catalog_nbr": "${codes.catalog_nbr}"}`);
        }
    })
    if (courseCodes.length === 0) {
        res.status(404).send(`The Subject ${subjectId} does not exist!`);
    } else {
        res.send(courseCodes);
    }
});

//Question 3

router.get('/question3/:subjectId/:course?/:component?', (req, res) => {

    var obj = JSON.parse(fs.readFileSync('Lab3-timetable-data.json', 'utf8'));

    var array = [];
    var subjectId = req.params.subjectId;
    var course = req.params.course;
    var component = req.params.component;

    obj.forEach((timetable) => {
        var subject = timetable.subject;
        var courseCode = timetable.catalog_nbr;
        var info = timetable;

        if (subjectId === subject && typeof course === "undefined" && typeof component === "undefined") {
            array.push(info);
        }
        else if (subjectId === subject && course === courseCode && typeof component === "undefined") {
            array.push(info);
        } else if (subjectId === subject && course === courseCode && typeof component !== "undefined") {
            array.push(info);
        } else if (typeof subjectId === "undefined" && course === courseCode && typeof component === "undefined") {
            array.push(info);
        } else if (typeof subjectId === "undefined" && course === courseCode && typeof component !== "undefined") {
            array.push(info);
        }
    })
    console.log(array);
    res.send(array);
})

//functionality to search for courses by course number
router.get('/question3a/:course', (req, res) => {

    var obj = JSON.parse(fs.readFileSync('Lab3-timetable-data.json', 'utf8'));

    var array = [];
    var course = req.params.course;

    obj.forEach((timetable) => {
        var courseCode = String(timetable.catalog_nbr);
        courseCode = courseCode.substring(0,4);
        if (courseCode.toLowerCase().includes(course.trim().toLowerCase())) {
        var info = timetable;
        if (typeof subjectId === "undefined" && course === courseCode && typeof component === "undefined") {
                array.push(info);
            
        }
    }
    })
    console.log(array);
    res.send(array);
})
//keywords
router.get('/keywords/:key', (req, res) => {

    var obj = JSON.parse(fs.readFileSync('Lab3-timetable-data.json', 'utf8'));

    var array = [];
    var keyword = req.params.key;

    obj.forEach((timetable) => {
        var classN = timetable.className;
        var courseCode = String(timetable.catalog_nbr);
        var info = timetable;

        if (classN.toLowerCase().includes(keyword.trim().toLowerCase()) || courseCode.toLowerCase().includes(keyword.trim().toLowerCase())) {
            array.push(info);
        }
    })
    console.log(array);
    res.send(array);
})



//authentic user
router.put('/authentic/new/:schedule/:user', (req, res) => {

    const s = req.params.schedule;
    var u = req.params.user;

    var exist = false;
    var sche = [];

    try {
        sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));

    } catch (err) {
    }

    if (exist) {
        res.status(403).send("The specified timetable already exists");
    } else {
        var newSche = JSON.parse(`{"scheduleName": "", "courses":[],"lastModified":""}`);
        newSche.visible = false;
        newSche.lastModified = new Date();
        newSche.scheduleName = s;
        sche.push(newSche);
        var jsonString = JSON.stringify(sche)

        fs.writeFileSync('users-' + u + '.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        res.send(sche);
    }


});



router.put('/create/newcourse/:schedule/:user', (req, res) => {

    const keyPairs = req.body;
    const s = req.params.schedule;
    var u = req.params.user;

    var exist = false;

    var sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));

    sche.forEach((element) => {
        if (element.scheduleName === s) {
            exist = true;
        }
    });

    if (!exist) {
        res.status(403).send("The specified timetable does not exist exist");
    } else {

        sche.forEach((element) => {
            if (element.scheduleName === s) {
                element.courses = keyPairs;
            }
        })

        var jsonString = JSON.stringify(sche)

        fs.writeFileSync('users-' + u + '.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }

    res.send(sche);

});


//Question 6 Get the list of subject code, course code pairs for a given schedule.
router.get('/authcourse/courselist/:schedule/:user', (req, res) => {

    var schedule = req.params.schedule;
    var u = req.params.user;
    var sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));
    var err = true;

    sche.forEach((s) => {
        if (schedule === s.scheduleName) {
            res.send(s.courses);
            err = false;
        }
    });

    if (err) {
        res.status(403).send("The specified schedule does not exist");
    }
});

//Question 7 Delete a schedule with a given name. Return an error if the given schedule doesn’t exist
router.delete('/users/deleteschedule/:schedule/:user', (req, res) => {
    const s = req.params.schedule;
    var u = req.params.user
    var exist = false;

    var sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));

    sche.forEach((element) => {
        if (element.scheduleName === s) {
            exist = true;
        }
    });

    if (!exist) {
        res.status(403).send("The specified timetable does not exist exist");
    } else {
        for (var i = 0; i < sche.length; i++) {
            if (s == sche[i].scheduleName) {
                sche.splice(i, 1);
            }
        }
        var jsonString = JSON.stringify(sche)

        fs.writeFileSync('users-' + u + '.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }
    res.send(sche);

});

//api call to get the course reviews
router.get('/view/review', (req, res) => {

    var sche = JSON.parse(fs.readFileSync('course-review.json', 'utf8'));
    //var lists = [];
    res.send(sche);
});


//Question 8 Get a list of schedule names and the number of courses that are saved in each schedule.
router.get('/authall/allschedules/list/:user', (req, res) => {

    var u = req.params.user;
    var sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));
    //var lists = [];
    res.send(sche);
});

//toggle the visibility function
router.patch('/toggle/course/:course', (req, res) => {
    let s = req.params.course;
    //let u = req.params.user;
    var tog = JSON.parse(fs.readFileSync('course-review.json', 'utf8'));

    tog.forEach(element => {
        if (element.catalog_nbr == s)
            element.visible = !element.visible;
    })
    var jsonString = JSON.stringify(tog);

    fs.writeFileSync('course-review.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    res.send("");
});

//toggle visibility flag of the schedules
router.patch('/toggle/flag/:schedule/:user', (req, res) => {
    let s = req.params.schedule;
    let u = req.params.user;
    var sche = JSON.parse(fs.readFileSync('users-' + u + '.json', 'utf8'));

    sche.forEach(element => {
        if (element.scheduleName == s)
            element.visible = !element.visible;
    })
    var jsonString = JSON.stringify(sche);

    fs.writeFileSync('users-' + u + '.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    res.send("");
});

//adding a review
router.put('/add/review/:course/:user', (req, res) => {

    const keyPairs = req.body[0];

    console.log(keyPairs);

    var rev = JSON.parse(fs.readFileSync('course-review.json', 'utf8'));
    console.log(rev);


    var pair = keyPairs;

    rev.push(pair);

    var jsonString = JSON.stringify(rev)

    fs.writeFileSync('course-review.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })


    res.send(rev);

});

//Question 9 Delete all schedules.
router.delete('/question9/delete/all/schedules', (req, res) => {

    var sche = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));
    sche.splice(0, sche.length);

    var jsonString = JSON.stringify(sche)
    fs.writeFileSync('schedule.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    res.send(sche);
});

router.get('/display/security', (req, res) => {
    var security = JSON.parse(fs.readFileSync('admin-security.json', 'utf8'));
    res.send(security);
});

router.put('/update/security', (req, res) => {

    const update = req.body;
    console.log(update);
    var jsonString = JSON.stringify(update)

    console.log(jsonString)

    fs.writeFileSync('admin-security.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })


    res.send(jsonString);

});

router.put('/update/aup', (req, res) => {

    const update = req.body;
    console.log(update);

    var jsonString = JSON.stringify(update)

    console.log(jsonString)

    fs.writeFileSync('admin-aup.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })


    res.send(jsonString);

});
router.get('/display/aup', (req, res) => {
    var aup = JSON.parse(fs.readFileSync('admin-aup.json', 'utf8'));
    res.send(aup);
});

router.put('/update/dmca', (req, res) => {

    const update = req.body;
    console.log(update);
    var jsonString = JSON.stringify(update)

    console.log(jsonString)

    fs.writeFileSync('admin-dmca.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })


    res.send(jsonString);

});

router.get('/display/dmca', (req, res) => {
    var dmca = JSON.parse(fs.readFileSync('admin-dmca.json', 'utf8'));
    res.send(dmca);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


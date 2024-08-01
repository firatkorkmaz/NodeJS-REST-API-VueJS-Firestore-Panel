const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');
const firebaseAuthController = require('../controllers/firebase-auth-controller');
const asyncHandler = require('express-async-handler')


/* Authorization Routes */

router.post('/register', firebaseAuthController.registerUser);
router.post('/signin', firebaseAuthController.loginUser);
router.post('/signout', firebaseAuthController.logoutUser);
router.post('/resetpassword', firebaseAuthController.resetPassword);


/* CRUD Operations Routes */

const CRUDFactory = require('../controllers/post-controller.js');
function CRUD(process) { return CRUDFactory.createCRUD(process).processData; }


router.post('/create', verifyToken, asyncHandler(CRUD('CREATE')));
router.get('/', verifyToken, asyncHandler(CRUD('READ')));
router.post('/update/:id', verifyToken, asyncHandler(CRUD('UPDATE')));
router.post('/delete/:id', verifyToken, asyncHandler(CRUD('DELETE')));
router.get('/log', asyncHandler(CRUD('LOG')));	// No Token Verification!

// CRUD Operations without Token Verification [for Testing Phase]
//router.post('/create', asyncHandler(CRUD('CREATE')));
//router.get('/', asyncHandler(CRUD('READ')));
//router.post('/update/:id', asyncHandler(CRUD('UPDATE')));
//router.post('/delete/:id', asyncHandler(CRUD('DELETE')));


module.exports = router;


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


/*
// CRUD Methods in Routers without Using "../controllers/post-controller.js"
// NOTE: asyncHandler was used for errors instead of try-catch.

const { db } = require("../config/firebase.js");
const database = db.collection('parameters');


function currentTime() {
	const date = new Date();
	return	date.getDate().toString().padStart(2, '0') + '/' +
			(date.getMonth() + 1).toString().padStart(2, '0') + '/' +
			date.getFullYear() + ' ' +
			date.getHours().toString().padStart(2, '0') + ':' +
			date.getMinutes().toString().padStart(2, '0');
}

function jsonify(list1, list2) {
	const jsonObj = {};
	list1.forEach((element, index) => {
		jsonObj[element] = list2[index]
	});
	return jsonObj;
};


router.post('/create', verifyToken, asyncHandler(async (req, res) => {
	const jsondata = JSON.parse(JSON.stringify(req.body));
	jsondata['create_date'] = currentTime();
	await database.add( jsondata );
	res.redirect("/");
}));

router.get('/', verifyToken, asyncHandler(async (req, res) => {
	const dataSnapshot = await database.get();
	const allRows = dataSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return res.status(201).json(allRows);
}));

router.post('/update/:id', verifyToken, asyncHandler(async (req, res) => {
	const jsondata = JSON.parse(JSON.stringify(req.body));
	jsondata['create_date'] = currentTime();
	const { id } = req.params;
	await database.doc(id).update( jsondata );
	res.redirect("/");
}));

router.post('/delete/:id', verifyToken, asyncHandler(async (req, res) => {
	const { id } = req.params;
	await database.doc(id).delete();
	res.redirect("/");
}));

router.get('/log', asyncHandler(async (req, res) => {
	const dataSnapshot = await database.get();
	const allRows = dataSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	
	var parameter_key = []; var value = []
	var dataObjList = JSON.parse(JSON.stringify(allRows));
	dataObjList.forEach(dataObj => {
		parameter_key.push(dataObj.parameter_key);
		value.push(dataObj.value);
	});

	const jsonLog = jsonify(parameter_key, value);
	return res.status(201).json(jsonLog);
}));


module.exports = router;
*/
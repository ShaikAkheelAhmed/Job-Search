const express = require('express')
const userCtrl = require('../controllers/userCtrl')
const router = express.Router()
const tokenAuth = require('../middlewares/tokenAuth')
const authorize  = require('../middlewares/authorize')

// public
router.post('/signup',userCtrl.register)
router.post('/signin',userCtrl.signin)

//Candidate
router.put('/:email',tokenAuth,userCtrl.update)


// Recruiter

router.get('/',tokenAuth,authorize.authorizeRecruter,userCtrl.getUsers)
router.get('/page/:page/size/:size',tokenAuth,authorize.authorizeRecruter,userCtrl.getUsers)
router.get('/:email',tokenAuth,authorize.authorizeRecruter,userCtrl.getUserByEmail)


//Admin
router.post('/recruiter/signup',tokenAuth,authorize.authorizeAdmin,userCtrl.addRecruiter)


module.exports = router
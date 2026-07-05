const express = require('express')
const { handleUserSignup, handleUserLogin } = require('../controllers/user')

const router = express.Router()

router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)


router.get('/signup', (req, res)=>{
    return res.render("signup")
    return res.render("signup");
})
router.get('/user/login', (req, res)=>{
    return res.render("login")})
router.get('/login', (req, res)=>{
    return res.render("login");
})

module.exports = router
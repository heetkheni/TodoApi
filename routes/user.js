import express from "express"
import { allusers, createUser, loginUser, logoutuser, myDetail, userByID } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"
export const router = express.Router()

router.get('/all', allusers )

// router.get('/userId/special',specialId)

router.post('/new' ,createUser)

router.post('/login' , loginUser)

router.get('/me' , isAuthenticated, myDetail)

router.get('/logout', logoutuser);

// we can provide same type of url in one route
router.route('/userId/:id').get(userByID)



// router.get('/userId/:id' ,userByID)

// router.put('/userId/:id' , updateUser)

// router.delete('/userId/:id' , deleteUser)

export default router
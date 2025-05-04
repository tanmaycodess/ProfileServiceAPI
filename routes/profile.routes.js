import express from 'express'
import { editProfileById, fetchProfileById, uploadProfilePicCOntroller } from '../controllers/profile.controller.js'
import { upload } from '../middleware/Upload.middleware.js'

const router = express.Router()

router.get('/details/:id', fetchProfileById);
router.patch('/details/update/:id', editProfileById);
router.patch('/upload/profile-pic/:id', upload.single('profilePic'), uploadProfilePicCOntroller);

export default router   
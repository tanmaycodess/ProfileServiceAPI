import signUpRoutes from './signUp.routes.js'
import loginRoutes from './login.routes.js'
import profileRoutes from './profile.routes.js'
import { isUserAuthenticated } from '../middleware/Authenticated.middleware.js'

const routes = (app) => {

    app.use('/api/v1/signup-auth' , signUpRoutes)
    app.use('/api/v1/login-auth' , loginRoutes)
    app.use('/api/v1/profile' ,isUserAuthenticated, profileRoutes)
}

export default routes
# Articles Backend API Specifications

Create an Articles RESTFul API with the below functionality.

### Articles
- List all Articles in the database
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Get single article
- Create new article
  * Authenticated users only
  * Must have the role "author" or "admin"
  * Field validation via Mongoose
- Update articles
  * Owner only
  * Validation on update
- Delete article
  * Owner only
  
### Comments
- List all comments for an Article
- List all comments in general
  * Pagination, filtering, etc
- Get a single comment
- Create a comment
  * Authenticated users only
  * Must have the role "reader" or "author" 
- Update comment
  * Owner only
- Delete Comment
  * Owner only

### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "reader" or "author"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Security
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public 

## Documentation
- Use Swagger documentetion

## Deployment (Digital Ocean)
- ##TODO

## Additional
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
1. display anonymous message on request visit page(please sign in to make a request)

2. display form to authenticated user

3. submit form with header Authorization: Bearer token(inside signupAuthorisation.js)

4. apiRoutes.js

   * post/api/requests - populate userID foreign key with req.tokenData.userID

5. display a list of the user's active requests(can stick on bottom of visit request page)

   * GET /api/requests - populate where.userID = req.tokenData.userID

6. add admin user to schema.sql

7. add admin changes to authentication.js
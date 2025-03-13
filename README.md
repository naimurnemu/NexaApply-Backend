# NexaApply-Backend
# Back-End API Routes

The following tables outline the API routes for the application, categorized by functionality.

---

## Auth Routes

| Method | API Route                  | Description                                      |
|--------|----------------------------|--------------------------------------------------|
| POST   | `/api/auth/register`       | Register a new user.                             |
| POST   | `/api/auth/login`          | User login, returns JWT token.                   |
| POST   | `/api/auth//forgot-password`  |   Forget password recover password with email    |
| POST   | `/api/auth/reset-password` | Send password reset link.                        |

---

## User Management Routes

| Method | API Route          | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/api/user/:id`    | Get user profile details.            |
| PUT    | `/api/user/:id`    | Update user profile details.         |
| DELETE | `/api/user/:id`    | Delete a user (Admin only).          |

---

## College Management Routes

| Method | API Route          | Description                                |
|--------|--------------------|--------------------------------------------|
| GET    | `/api/colleges`    | Fetch all colleges.                        |
| GET    | `/api/colleges/:id`| Fetch details of a specific college.       |
| POST   | `/api/colleges`    | Admin adds a new college.                  |
| PUT    | `/api/colleges/:id`| Admin updates college details.             |
| DELETE | `/api/colleges/:id`| Admin deletes a college.                   |

---

## Admission Routes

| Method | API Route                  | Description                                      |
|--------|----------------------------|--------------------------------------------------|
| POST   | `/api/admission`           | Submit admission form.                           |
| GET    | `/api/my-college/:userId`  | Fetch applied college details for a user.        |

---

## Review Routes

| Method | API Route                  | Description                                      |
|--------|----------------------------|--------------------------------------------------|
| POST   | `/api/reviews`             | Add a review for a college.                      |
| GET    | `/api/reviews/:collegeId`  | Fetch reviews for a specific college.            |

---

## Admin Management Routes

| Method | API Route          | Description                                             |
|--------|--------------------|---------------------------------------------------------|
| GET    | `/api/admins`      | Get all admins.                                         |
| POST   | `/api/admins`      | Add a new admin (Admin only).                           |
| DELETE | `/api/admins/:id`  | Remove an admin (Admin only, cannot delete self).       |
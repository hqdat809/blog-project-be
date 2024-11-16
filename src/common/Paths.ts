/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Users: {
    Base: "/users",
    Get: "/all",
    Add: "/add",
    Update: "/update",
    Delete: "/delete/:id",
  },
  Auth: {
    Base: "/auth",
    Login: "/login",
    Register: "/register",
    Logout: "/logout",
  },
  Post: {
    Base: "/post",
    Get: "/all",
    Add: "/add",
    Update: "/update",
    Delete: "/delete/:postId.:authorId",
  },
} as const;

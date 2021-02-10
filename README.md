## Next.js / Firebase Auth Example

The objective here is to have authentication that persists whenever a user closes a tab or when multiple tabs are open.

### Includes

- Next.js
- Firebase Authentication
- Nookies

### Next.js

[Next.js](https://nextjs.org/) provides us a router that allows us to easily route a user if they are or aren't logged in.

### Firebase Authentication

[Firebase Auth](https://firebase.google.com/products/auth) is used to help facilitate signing in and out and also helps us manage authentication state with a special `onIdTokenChanged` method that will let us know when the token of the currently signed in user changes.

### Nookies

[Nookies](https://github.com/maticzav/nookies) helps us manage cookies and we use this when we have pages with SSR. When a page is server-side rendered, we check the cookies to see if there is a session with a token. We then verify that token with Firebase Auth's `verifyIdToken` method to let us know if we should redirect the user to the login page or not.

### Important Things to Note

- (My opinion) All private pages should be server-side rendered. Why? Because we want to check and see if the user has a current session before we load the page.
- With Firebase Auth, there are "3 states": unknown, signed in, not signed in.
  - When you run the app, it takes some time for Firebase Auth to check if there is a user signed in or not, this is the **unknown state**
  - This is why we server-side render the private pages. We can bypass the **unknown state** with a loading indicator and still be able to reroute the user when necessary.
  - This implementation works when using Firebase Auth on the clien. Moving your login logic to the api folder will not work.

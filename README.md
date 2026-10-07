# Task 1 (Variant): Campus Events API

You are building the backend for a campus events board. Anyone can add, browse, update and delete events. There is no login.

Use **Express** and **MongoDB (Mongoose)** only. There is no frontend and no SQL.

---

## What's already done for you

The project already contains a complete **Product** CRUD API:

- `models/product.model.js`
- `controllers/product.controller.js`
- `routes/product.route.js`
- `index.js`: app setup, the database connection, and the `/api/products` router

Read these files first. They are your worked example: your event code should have the same structure (one function per route: DB call, then response).

**Do not change the Product code.**

---

## Project structure

```
simple-crud/
├── controllers/
│   ├── product.controller.js     (given)
│   └── event.controller.js       (you create)
├── models/
│   ├── product.model.js          (given)
│   └── event.model.js            (you create)
├── routes/
│   ├── product.route.js          (given)
│   └── event.route.js            (you create)
├── index.js                      (you add one line to mount your router)
├── package.json
└── .gitignore
```

---

## Setup

1. Install Node.js (LTS) and Git.
2. **Fork** this repository to your own GitHub account (the "Fork" button, top right). Do all of your work in your fork.
3. Clone **your fork** (not the original repository), then run:

```
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```

4. Create a file called `.env` in the project root (it must be listed in `.gitignore`, never commit it):

```
PORT=3000
MONGO_URI=<the connection string given in class>
```

5. Start the server:

```
npm run dev
```

If your project has no `dev` script, use `node index.js` instead.

6. Test your endpoints with Postman, Insomnia or Thunder Client.

> Note: everyone shares the same database cluster. Use distinctive event titles when testing so you don't collide with a classmate's data.

---

## What you need to build

Create three new files, then mount your router in `index.js` at `/api/events`.

### 1. The Event model: `models/event.model.js`

| field | type | rules |
|---|---|---|
| `title` | String | required, trimmed |
| `description` | String | optional |
| `date` | Date | required |
| `location` | String | required (e.g. "Hall B") |
| `capacity` | Number | required, `min: 1` |
| `category` | String | enum: `academic`, `social`, `sports`, `career`, `other`; default `other` |
| `isFree` | Boolean | default `true` |
| `price` | Number | `min: 0`, default `0` |

Requirements:

- Add the `{ timestamps: true }` schema option.
- Add a **compound unique index** so the same title can't be scheduled twice on the same date. Think about which fields it should include.
- Use Mongoose's built-in validators only. **Do not use Joi.**

### 2. Controller and routes

Write one function per route in `controllers/event.controller.js`, and wire them in `routes/event.route.js`. Choose the paths and HTTP methods yourself, following REST conventions.

| action | success response |
|---|---|
| Create an event | `201` with the created event |
| Get all events | `200` with an array of events |
| Get one event by id | `200` with the event |
| Update an event by id | `200` with the **updated** event |
| Delete an event by id | `200` with a confirmation message |

Rules:

- If the id is valid but no event exists, respond `404` with `{ "message": "Event not found" }`.
- Wrap each handler in `try/catch`. Return `500` with the error message for unexpected errors.
- On update, Mongoose validation must still run (for example, a `capacity` of 0 must be rejected). Find out which option is needed.
- On a duplicate event, respond `409` instead of `500`. Find out which error code MongoDB uses for this.

### 3. Stretch goal: filtering

Support query-string filtering on top of the base "get all events" route:

```
GET /api/events?category=sports&isFree=true
```

Only apply the conditions the client actually sent. With no query string, the route must still return every event.

Hint: query-string values always arrive as text. Think about what that means for `isFree`.

### 4. Stretch goal: upcoming events

Add a route that returns only events whose `date` is in the future, sorted soonest first:

```
GET /api/events/upcoming
```

Make sure this route is not swallowed by your `/:id` route. Find out why the order of your routes matters.

---

## Testing checklist

Before you submit, make sure you can show each of these working:

- [ ] Create an event, and get `201` with the saved document
- [ ] Create the same event twice, and get `409`
- [ ] Create an event with `capacity: 0`, and get a validation error
- [ ] Create an event with a missing `title`, and get a validation error
- [ ] Get all events
- [ ] Get one event by a valid id
- [ ] Get an event with a valid id that doesn't exist, and get `404`
- [ ] Update an event, and the response shows the **new** values
- [ ] Update an event with `capacity: 0`, and it is rejected
- [ ] Delete an event, then confirm it is gone
- [ ] (Stretch) Filtering returns the right subset
- [ ] (Stretch) `/upcoming` returns future events only, soonest first

---

## Submission

1. Work in your fork, and commit regularly with clear messages. Your commit history shows your own work.
2. Push your commits to your fork:

3. In your fork, add a short section called `## API Examples` at the end of this README with **one example request and response for each route**.
4. Open a **pull request** from your fork to the `main` branch of the original repository. In the pull request description, write your full name and your student ID.
5. Make sure `.env` is not committed. If you accidentally pushed it, tell your instructor right away.

Do not edit the Product files. Pull requests that change them will be sent back.

---

## AI use

You're expected to use AI tools while building this. That's fine and expected.

But you remain responsible for all of the code you submit. You must be able to explain, for **any line in your controller**, why it's there and what happens if you delete it. We will ask.

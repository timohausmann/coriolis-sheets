# Coriolis Sheets

A web app to create and share character sheets for the role-playing game Coriolis. Build with Svelte and Firebase.

[https://coriolis-sheets.web.app/](https://coriolis-sheets.web.app/)

## Contribute

For feedback, ideas, feature requests, if you found a bug or would like to contribute code, artwork, translations etc., just open an issue, create a pull request or shoot me an email.

Thanks to our contributors!

* [grcarmenaty](https://github.com/grcarmenaty) – Spanish translation
* [betkov](https://github.com/betkov) – Czech translation

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5555](http://localhost:5555). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0` (start script).


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to firebase

From within your project folder:

```bash
firebase deploy
```
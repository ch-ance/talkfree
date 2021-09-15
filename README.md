# talkfree
censorship-resistant, peer to peer messaging.
<br/>
It's basically a fully decentralized Discord alternative.


## goals

p2p decentralized censorship-resistant alternative to apps like discord.

## features
these are existing + planned. these don't necessarily exist yet.
<ul>
    <li>
real-time peer-to-peer chat
    </li>
    <li>
handles thousands of participants in a single channel
    </li>
    <li>
    </li>
</ul>


## techstack
- SolidJS - it renders very quickly and it seems to encourage good code practices. Basically, it's kind of easy to screw up a React app. 

- Dexie - helpful indexedDB wrapper. We want to store data in the browser so that we can quickly fetch it and render it, while we wait for peer responses and eventual consistency and all that. Dexie doesn't handle any of this extra stuff for us, so the rest of the tech stack will.
> NOTE: I'm not sure if we need Dexie. OrbitDB saves data "on disk". not sure where that is exactly, so we'll see.

- OrbitDB to talk to IPFS for data storage that is persistant as well as it handles peer discovery for us.

## how messaging works
- create new identity
to create a channel:
- create an orbit log
- when a new user joins, give them write permissions to the log
to join a channel:
- request to join the channel's log
- someone needs to add the identity to have write access


## resources 
http://colormind.io/ - generate color palettes
https://www.tailwindshades.com/ - generate tailwindcss shades from a given color




## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ch-ance"><img src="https://avatars.githubusercontent.com/u/33612720?v=4" width="100px;" alt=""/><br /><sub><b>Chance Embrey-Farquhar</b></sub></a><br /><a href="#code-ch-ance" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://moddermeht.ml"><img src="https://avatars.githubusercontent.com/u/14153763?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Modder Me</b></sub></a><br /><a href="#infra-modderme123" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!














> Below is the autogenerated README from creating a new SolidJS app.
## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.js.org/) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```
### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

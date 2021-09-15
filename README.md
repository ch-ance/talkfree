# TODOS
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
- messages shouldn't send when there is no channel.
  - SOLUTION: Disable the send button when there is no active channel! <-- this is the current solution. `Send` UI is disabled during loading.
  - OTHER POSSIBLE SOLUTION: auto-join every user to a "hello-world" channel.
    - maybe only allow emojis or censor profanity somehow
- FIX THE LOGIN UI. I click "sign in" every single time instead of create user
### Solving Infinite Scrolling problem
Infinite scrolling sucks in the browser if you don't know the height of the items before you fetch them. It causes layout shifts.

This is easy if every item is the same height, however in something like a messenging application, messages all vary in length so we don't know the height ahead of time. This is

To fix this, we can maintain a linked list or tree-like structure on each item that tells the approximate height of the next and previous items.

For example, a message could look like this:
```
{
    from: "Chance",
    text: "Hello!",
    prevMsgLength: 54,
    nextMstLength: 22,
}
```

The browser should know the avg number of characters that fit on a line, as well as the height of a line on the DOM, and can predict the height of the next/previous message.

Now we can account for the current message + one additional message in the list. 
To account for 1 + n messages in the list, just make a tree in the document.
Modifying our previous example...
```
{
    from: "Chance",
    text: "Hello!",
    prev: {
        -1: { len: 54 },
        ...
    },
    next: {
        1: { len: 22 },
        ...
    }
}
```

But why stop there? We can store the message text in the prev/next trees as well: 
```
...
prev: { 
    -1: { 
        from: "Mark",
        text: "Bloop blop bloopoo bleep"
    },
    -2: { 
        from: "Dave",
        text: "woopity wop wop wop!"
    }
},
next: { 
    1: { 
        from: "Adam",
        text: "real words real words"
    }, 
    2: {
        from: "Chance",
        text: "this is a messaage"
    }
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://moddermeht.ml"><img src="https://avatars.githubusercontent.com/u/14153763?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Modder Me</b></sub></a><br /><a href="#infra-modderme123" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
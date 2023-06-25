The goal of this project is to see how sounds can be included in Web documents, and in interactions and UX in general.

This project will attempt doing so by recreating the Stanley Kubrick [Space Odyssey experience](https://www.youtube.com/watch?v=cHWs3c3YNs4) - an element that will "sing" when getting close, hinting to the user of its significance.

Give it a try ==> [Live demo](https://kutneruri.github.io/exprmnt-sound-fx/)!

## Context

Sound design is a pretty much completely ignored aspect of the web experience. Other than the big tech, almost no one is using audio cues in their apps.  
It's no big surprise, really, when you think about it. The web started out as a collection of e-documents more similar to Wikipedia than to the interactive apps we have today. In the daily experiences of the real world, and even native applications, everything comes in a _full sensory experience_, relying mostly on sight, yes, but usually also audio.

So I thought - if we visually animate elements when the user is interacting with them, why not also make some sounds? We can associate certain sounds with actions, teaching how to use the app faster, and giving the user more feedback and information.

## Future CSS

It is a shame we can't control sounds with CSS today.  
It would have been a much better UX to just apply like so:

```css
.button:hover {
  sound: url("/sounds/button-hover.weba") 300ms 80ms 60% loop;
}

.button:active {
  sound: url("/sounds/button-active.weba") 180ms 80ms 85%;
}
```

Hey W3C, how about adding this as a proposal? It's rough now, but useful.

## Feedback

If there is interest, I will make the React Sound Component into an npm package.  
Feel free to comment your thoughts in a github issue.
What did you feel? Would you incorporate sounds in your app?

## TODO:

- [x] play audio at all
- [x] play audio on :hover
- [x] play something else on click
- [x] replace sounds with something from the Space Odyssey 2001
- [ ] style to look like the slab.
- [ ] style page to look like its surrounding.

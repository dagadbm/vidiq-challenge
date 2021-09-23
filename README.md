# WARNING
The UI is terrible. I tried to make it as simple as I could.
I am not a good designer but I am good at looking at other peoples design,
improving it and making it more consistent
with the overall codebase.

Some of my mantras when doing UI work:
- padding/margins/spacings of any kind, multiples of 8!
- Multiples of 8!
- Prefer the browser do most of the placements instead of forcing width/height
- css grid for two dimensions, flexbox for one dimensions
- position absolute when needed or when performance in rendering is a problem (I have a fun story here if you remember to ask me)

## Setup
Just `npm install`and `npm run dev`.

The following sections will explain my reasoning behind each choice, why it was good (or bad)
and what I would do differently.

## Technical Decissions
### Bootstrap Tool
I looked at several alternatives to bootstrap react. I have been out of the react scene
for some time now so I always like to take this opportunity and investigate whats up and running.
I found some pages on react docs and so on which showed some alternatives to the tried and tested
`create react app`. But I have been using vite for challenges lately so I went with it.
Maybe another day i will try snowpack.

I had quite some problems with the import paths because one: neovim with lsp gave me an error saying the path didnt exist (which it does because the app works).
Jest also broke exactly in the same manner so appologies for the imports.
I could have done the @/ mapping that people in vue usually use but I decided against it to keep it simple.

If this was a production grade app i would go with create react app because vite also
has its own quirks and issues which, when using typescript, make it even worse.

### JS vs TS
I decided to go with typescript because it is what vidIQ uses.
I dont want to be biased or negative, but my experience with typecript was terrible.
I couldnt even do tests because of forwardref typing which wasn't working (i left a comment on the test).
I dont see the benefit, but I am sure that on a more scaled project with patterns in place and good usage it will improve.

Still, it is scary that there are 2 or 3 github repos that contain cheasheets for typescript and in each of those repos contain 30 or more links
for you to really understand and grasp how easy and amazing typescript is...
There is even discussion about how the best future proof way to import react is... Seriously... You have to be outside of the react community for some time and then back
in again to see how ridiculous this all is. I spent more time thinking about closures and scopes and "omg does this component re-render or not" than actually building the product.

### Store
I looked at a couple of stores, including the classic redux which seemed to be a bit more formal now due to their recommended toolkit + RTK.
I googled a bit and found out that a lot of people are using zustand now.
I also knew about immer and to be fair after using Vue for quite some time having to think about creating new objects/array because of react === design decision
is a terrible experience. I saw immer was very low in terms of bundle (but still a higher bundle size than zustand) but I went for it.

I found the experience interesting but I think in terms of test its probably harder to mock the store.
I also dont like they dont have namespaced stores (i mean you can kind of fake it but still).
I also had to create selectors to prevent all those re-renders when the store changes.

### Styling
I wanted something easy and scoped, the only "native" alternative (as in supported by vite) that did this was using css modules.
Since the css was so basic I found no need for scss/sass.

Again in a production grade I would probably use styled components (which i have used in the past).

## Initial Approach

For this challenge I decided to start working bottom up.
Firstly designing the store, then the components and in the middle create/remove the necessary
refactorings/abstractions that pop up to me while I am coding.
Afterwards I decided to try and fetch the photos and show the on screen first. (with favorites)
After that creating the infinite scroll logic. Followed by the toggle favorite list.
Afterwards I would add tests (to be honest I never did TDD and I find it very hard to do on front-end but here is hoping it is possible).

## Architecture
After all is said and done this is the final architecture result.
I will briefly explain what each component does, how it could be improved, why I decided for it and humps I found along the way.

### Components
For this section I highly recommend you have another tab opened with the component in question for easier reading.

I have 3 components: **Favorite**, **Photo** and **PhotoGallery**.
The App component just renders the PhotoGallery.

The **Favorite** component is basically just an svg of a heart which you can toggle
via props. I decided to do it this way just to not have to handle with the whole webpack-svg loader drama. Seems that vite had an svg loader but this is all very new.
Again if production grade software I would have used create-react-app which apparently already has native support to import an svg file as a react component.

The **Photo** component basically renders a photo + the favorite icon.
I decided to send the id of the photo as a prop.
This will minimize re-renders (since id is just a number).
It is then up to the Photo component to get the data from the store.
I used a useCallback hook here as suggested by zustand documentation.
I could have also used a selector which would receive an id and return a function
for this and the end result would be something like `useStore(useCallback(photoByIdSelector(id), id))` but the net result would be the same.
In practice I hate passing props like crazy (be it vue or react) I much prefer
each component to handle all the state fetching it needs even if it makes the tests harder. As long as you have a robust render helper function on your tests that lets you easily mock your state this is all a thing of the past. You can also use MSW to mock the requests (I do both on the interface I wrote).

The **PhotoGallery** is the component responsible for showing all the photos,
the infinite scroll logic and the toggle favorite list feature.
I had a lot of problems here in particular: getting a ref that triggered an update 
on the component when written (because I need a ref to the last photo to trigger the infinite scroll).
I also had troubles on the infinite scroll, it ended up starting as a self contained hook but I couldnt get it to update its state (you can check the commit history).
In the end I ended up having to move the logic to the store.
I also used some store selectors to get all fotos and favorite fotos and then just toggle between those.
In the end you can think of this component as the glue that makes everything work together nicely.
Fun fact: That useEffect with the if has to be there because since I am storing
everything in localStorage every refresh would fetch next photos everytime even if you never scroll to them. It was the easiest way I found to fix this without going too deep in spliting the store up even more.

### Hooks
The hooks were where I had the most trouble, and still now I am a bit unsure on some of the decisions I took regarding separation of concerns per each hook.

I have 2 hooks: **useReactiveRef** and **useInfiniteScroll**.

The **useReactiveRef** hook I had to do a bit of googling to understand why I needed it. I left the articles I read there for context.
Basically useRef doesnt really trigger re-renders when it changes so I need a way
for the ref to be reactive. I tried several solutions (even the ones in the article) but in the end I had to go with using a state variable.
I clearly simplified most of the code (it is only 3 lines) because for my use case it was good enough.
In Vue I never once had to think about this... good job facebook! :=)
This hook is crucial for the infinite scroll to work.

The **useInfiniteScroll** hook is the main responsible for making the infiniteScroll work. I feel a bit weird having a hook that doesnt really return anything and it is one of the things I feel a bit unsure about.
I already heard about the IntersectionObserver so I knew this was what I would use to fix the problem.
I browsed through a lot of github repositories that give several implementations of this and adapted the code to fit my purposes.
The node prop here is what useReactiveRef is for (check PhotoGallery).

I could have probably have these two hooks together. Like I said I am still a bit
unsure if this is what I would want in a production grade software.
If this was an MR I would probably do some more iterations until I found the right separation of concerns.

### Store
The store started being very agnostic to the pagination logic but in the end I had to bite the bullet and keep the pagination logic here to get a working solution.

I have also decided to persist the entire store in localStorage. I know there is a github package that allows you to save things to localStorage + indexDB et al but I googled it and couldnt remember the name... God knows I searched for it. 

Fun fact: I had to look at zustand source to learn that i could blacklist/whitelist the store by key (I ended up not using it in the end).

I think the most interesting part of the store is the fetchPhotos method,
everything else is pretty straight forward.

I basically decided to have this method receive the first and cursor params,
similar to how you do pagination using graphQL and by default have the store
handle those values. In this manner you only need to call the method and everything will magically work, if you refresh the page you get to the previous state you were in before, including the favorites and so on.

Of course in production I am unsure if this would be the best solution, of course this API is static so its OK but in real life...

## Tests
Oh boy...
I have to say, after installing a bazzilion packages to support jest, react-testing-library and typescript I spent more timing fighting the useless typescript errors than writing tests.
I honestly gave up, the learning curve to properly fix the problem and understand it would be too big (you can check out Photo/index.spec.js for the error).
I have written quite complex tests in Vue that even involve dispatching actions from outside the component where I have components that listen to the actions (I can show you if you are interested). I had to do some tests on contenteditable fields (plot twist jsdom does not support contenteditable. So I have some experience here.
But typescript... jesus christ. Hopefuly you will prove me wrong and sell me how amazing it is.

# Conclusion
I had fun doing this challenge but to be fair I was feeling a bit burned out towards the end I could try and push for more tests but my poor decision on thinking that typescript is just javascript with types got the best of me. I am curious if you can help me fix that jest error.
Looking forward to talking to you guys.

PS: Dont try to npm run build it wont work because of the typescript types + weird import errors which make no sense. This is probably fault of vite....

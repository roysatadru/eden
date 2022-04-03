[![Live Project Screenshot](assets/screenshots/finished-project.png 'Live Project Screenshot')](https://eden-azure.vercel.app/)

# Eden

A ReactJS project based on [this mockup](https://dribbble.com/shots/15669113-Onboarding-Exploration/attachments/7464145?mode=media). **Live Project Link ---> [EDEN](https://eden-azure.vercel.app/)**

## Things to keep in mind

- Use "[Inter](https://fonts.google.com/specimen/Inter)" as the choice of font
- Icons should be snipped out of the mockup
- Code should have a typical structure to let developers easily get what's going on in the project
- Responsive UI and UI works well across devices
- User Experience flow should be optimal and everything should be clear

## Planning the User flow

- User visits the app for the first time (my goal will be to show a basic guide to help her/him figure out the features, that are worth looking)
- User then navigates to the main app (will need a `<a></a>` tag to navigate to the main app)
- User starts filling out the first form (Full Name and Display Name) (a form with validations in place)
  - User doesn't give proper inputs -> User will be guided using helper texts (validations on blur or on submit)
  - For Display Name field -> User input will be validated while user is typing to check whether the display name has already been used by some other users. (will put some dummy users `[{ display_name: "sata", full_name: "Satadru Roy" }, { display_name: "rish", full_name: "Rishabh Waghwani" }, { display_name: "anub", full_name: "Anubhav" }]` in a json file and emulate an api call to the servers (using fatch api and setTimeouts). **NOTE**: We should almost never fetch all the users' info in the client for obvious reasons in these scenarios and should not check whether the user is already onboarded or not in this manner but to emulate a practical case, I will do so in this app)
  - User does pass proper inputs but there is no internet connection. (will show a toast to properly inform what's happening to the user)
  - There is internet connection and user doesn't have any problems in her/his input.
  - User will be moved to the next step
    and this process will continue until all the steps are complete and...
- User finally is presented with a "Congratulations" page and asked to press "Launch Eden" button, which `onClick` will open a modal with some celebrations on the background and a modal asking user to give a rating to the app.
- On the modal, there will be a button "Back to guides" which will redirect the user back to the Basic Guide page.

## Other Considerations

- As React@18 is being used, we will be getting out of the box support for state batching in all scenarios.
- Lazy Loading `React.lazy` and the improved `<Suspense>` boundaries can be used but will be an overkill (but definitely an option if the pages get larger and have lots of components in them) - so won't use it
- User should be left with a satisfied feeling after she/he completes the entire flow. So, animations can come to the rescue.

## Planning the use of Front-end Packages

- [Tailwind CSS](https://tailwindcss.com/) (it will be fun to use it for the first time)
- [Tailwind CSS Forms](https://tailwindcss-forms.vercel.app/) (to get a basic reset for form styles)
- [React Hook Form](https://react-hook-form.com/) (for managing form state without hassle)
- [io-ts](https://gcanti.github.io/io-ts/) (for form input validations)
- [Framer Motion](https://www.framer.com/motion/) (to apply some cool animations)
- ~~[React Router DOM](https://reactrouter.com/)~~ (not using it anymore, replaced its implementations with Context API thus decreasing the project's bundle size)

  - ~~To show two pages (a short guide for the users to help them figure out the features, that are worth looking)~~ (not worth doing but we can simply show a dialog for showing the user guides)
  - ~~To use [`<MemoryRouter>`](https://reactrouter.com/docs/en/v6/api#memoryrouter) in an interesting way~~ (removed the implementation in the latest release. But the old implementation can be found in [this release](https://github.com/roysatadru/eden/releases/tag/v1.0.0))

    **NOTE**: We can achieve the same thing with useState or useReducer or Context API.
    So why am I using this approach?

    - To be a bit unique
    - To experiment with a feature that is hardly ever used in this scenario.
    - If this project can be thought of as a part of a larger application then probably we would use some kind of a routing library anyways so the extra bundle size sort of makes sense.

- [React Hot Toast](https://react-hot-toast.com/) (it will be fun to use it for the first time)
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) (to celebrate the completion of the flow by the user)
- [React Simple Star Rating](https://react-simple-star-rating.vercel.app/) (to show a rating component)
- [Email JS](https://www.emailjs.com/) (to send the rating submissions to my email [satadru.roy98@gmail.com](mailto:satadru.roy98@gmail.com))

## More Info

- Assets
  - Favicon - Generated using online [Favicon Generator](https://www.favicon-generator.org/)
  - Font - Using Inter which is available as a variable font, but `font-variation-settings` won't be used in this project for primarily two reasons. Firstly, it doesn't yet have [>95% support](https://caniuse.com/variable-fonts) so using it won't work well across devices and secondly Tailwind doesn't have default utility classes for this and for that reason, custom utility classes needs to be created to use this feature. So, using static fonts do seem more practical.
  - Icons - Snipped out from [the mockup](https://dribbble.com/shots/15669113-Onboarding-Exploration/attachments/7464145?mode=media) and converted into svg using Google Image Search, [Convertio](https://convertio.co/png-svg/), [Boxy SVG](https://boxy-svg.com/) and [SVGOMG](https://jakearchibald.github.io/) and stored in [assets](assets/) folder.
- Colors (Picked from color picker in google chrome dev tools)
  - Primary Color - #664de5
  - White - #fff (primary contrast text, background color)
  - Gray 01 - #f8f9fc (secondary background color)
  - Gray 02 - #eaeef5 (border color)
  - Gray 03 - #8b97b1 (input placeholder color and color in inputs)
  - Gray 04 - #5c6984 (Sub-Heading, Secondary Sub-Heading)
  - Gray 05 - #4e5a74 (1-2-3-4 stepper text color)
  - Gray 06 - #364259 (label color, unselected card icon color)
  - Gray 07 - #2f2e41 (Secondary Heading)
  - Gray 08 - #151b28 (Primary Heading)
  - Gray 09 - #080b11 (Logo Writing - Eden)
- Spacings (while it can't be accurately measured from [the mockup](https://dribbble.com/shots/15669113-Onboarding-Exploration/attachments/7464145?mode=media), a huge effort will be made to get as close as possible to [the mockup](https://dribbble.com/shots/15669113-Onboarding-Exploration/attachments/7464145?mode=media)). Chrome Extensions like [Designer Tools](https://chrome.google.com/webstore/detail/designer-tools/jiiidpmjdakhbgkbdchmhmnfbdebfnhp) can help a lot in this front and so, will be used.

## Personal Goals

- I want to have fun while building this project.
- I want to experiment with new packages (I have been trying to create a project with these packages for some months now but haven't been able to do so).
- I want to prove myself as a unicorn developer. [More on unicorn developers](https://easternpeak.com/blog/3-in-1-developer-a-jack-of-all-trades-or-a-unicorn/#:~:text=A%20so%2Dcalled%20%E2%80%9Cunicorn%20developer,stack%20engineers%20are%20unicorns%20too.)
- I also want to prove my expertise of ReactJS library.
- I too want to show my familiarity with React@18.
- I too want to host the project on either [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) to set up automatic builds which would make my life a bit easier.

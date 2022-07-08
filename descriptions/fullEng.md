# Idea

I wanted to create my portfolio so that any people could easily and quickly find out about me, my hobbies and projects. And, of course, this project is a good practice for creating web applications.

# Preparation

## Creating an architecture

The first stage of development consisted of creating the architecture and selecting the necessary libraries. I immediately decided that I would use [react](), despite my desire to work with [vue](), I wanted to write a portfolio with a more familiar framework. As the main libraries, of course, I used [router]() and [redux]() as the global data store.

I wanted my portfolio to have its own style, so I decided not to use UI libraries. As an exception, I decided to add [react bootstrap]() only for containers with their breakpoints to make it easier to adapt the site to mobile devices. I also couldn't give up [styled]() because of the convenience and [framer]() because of its exciting animations, which are also very easy to register directly in [javascript]().

I decided to store the data using [firebase](), as this service seemed to me quite simple and convenient to use. Initially, I wanted to keep all the information in [cloud firestore](), but in the process I thought that all my pet projects would obviously exist on github, so I decided to store the project description and related images directly in my repositories and use the [github api]().

## Filling

I want to fill my portfolio with my projects with a brief description.

I also believe that every site needs to have dark and light interface themes. So, if a user uses a dark theme in the operating system or in the browser, then the site must meet this requirement. So when the page loads for the first time, the user will be satisfied that the theme of the site corresponds to his preferences.

I also immediately decided that I would adapt the site to two languages, because, again, this is attention to user preferences, as well as good English practice for me. To add language support, I decided to use the [i18n]() library, as I had heard about it before. But then I realized that the functionality that I used could be implemented myself without any problems.

# Creation process

The creation process was not something extraordinary. I learned [redux]() and [router]() better and got more practice.

## Difficulties

When writing the code, I certainly encountered minor difficulties. But, probably, the main problem that I encountered does not really relate to this project: it is the complexity of filling with content. I would like the pages about the projects not to be empty, but since I write a description of the projects after their creation, a lot of interesting moments are forgotten and there is not much to write about. In addition, so far, mostly there are test tasks, about which you can't say much at all. From now on, I think I will try to record the important moments and difficulties I encountered right in the process of creating.

# Conclusion

It was interesting to create this project at the beginning, but due to the fact that it stretched for a long time due to personal problems, at the end I already wanted to finish it as soon as possible and start implementing my new ideas. In addition, I think I need to speed up the layout stage by creating design projects, because layout on the go slows me down a lot. Moreover, I want to focus more on working with asynchrony, different apis and working with [redux]().

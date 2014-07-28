This project is a simple demonstration of creating a real-time chat application using angular, express and socket.io.  Partly inspired by this blog post: http://briantford.com/blog/angular-socket-io.  

By wrapping the client side socket.io api in an angular service we can ensure we have live updates by triggering the digest loop when socket.io events are emitted.  Additionally it allows us to inject a mock socket.io api wrapper when testing our application.

![](/../screenshots/screenshot.png?raw=true)

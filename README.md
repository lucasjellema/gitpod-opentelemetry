# Gitpod workspace for exploring OpenTelemetry 
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lucasjellema/gitpod-opentelemetry)

# OpenTelemetry - Instrumentation of a simple Node application

(based on this article: [How to Get Started with OpenTelemetry Node.js](https://www.aspecto.io/blog/getting-started-with-opentelemetry-node/)

The sources *app/index.js* and *app/tracing.js* are of interest. The latter provides the instrumentation for the former. Nothing was changed in the former - a simple Express based Node application that exposes a REST API and communicates with a Mongo Database - except for the addition of a require statement (for *tracing.js*). (note: instead of this require statement, we could also use a --require parameter when running the Node application)  

Run a Mongo Database with this statement:

```
docker run -d -p 27017:27017 mongo
``` 

Run the Jaeger trace collector and UI with this command:

```
docker run -d --name jaeger-stand-alone \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.39)
```

In directory *app*, run the Node application - exposing an API on port 3000:

```
npm install
node .
```

Make a call (or a few) to the REST API using this curl command:

```
curl http://localhost:3000/todo
curl http://localhost:3000/todo/2
curl http://localhost:3000/todo/1
```

Now check in the Jaeger UI if you can find the traces (and of course you will be able to); open Jaeger UI at port 16686: 

![](images/open-jaeger.png)  
Search for the traces for the *todo-service*.
![](images/todo-traces.png)  
Click on the of the traces to see more details - including the Mongo interaction:

![](images/trace-details-mongo-find.png)  

## Introduce an Inspect a random Delay

Uncomment the line 

```
  // if (Math.random() < 0.3)  { await sleep(1000)  }   
```
in index.js. Restart the application.

Make a few calls to the REST API; some are likely to be slow:

```
curl http://localhost:3000/todo/2
curl http://localhost:3000/todo/1
curl http://localhost:3000/todo/3
curl http://localhost:3000/todo/3
curl http://localhost:3000/todo/3
curl http://localhost:3000/todo/1
```

Check in the Jaeger UI if you can find evidence of these slow requests (that should not be too hard).
![](images/jaeger-slow-requests.png)  

# OpenTelemetry End to End, All Encompassing Demo

The instructions are based on this [OpenTelemetry Demo document](https://github.com/open-telemetry/opentelemetry-demo/blob/main/docs/docker_deployment.md)

Clone the Webstore Demo repository:
```
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

Navigate to the folder that holds the cloned repository:

```
cd opentelemetry-demo/
```

Run Docker Compose to start the demo:
```
docker compose up --no-build
```


## Open Gitpod Workspace in VS Code Desktop

The demo application can best be run locally - using port forwarding in for example VS Code (because it uses references to localhost for example to publish metrics that are not resolved correctly in the Gitpod workspace VS Code browser environment).  So, open the workspace in VS Code Desktop (open the command palette in the VS Code Browser - using `CTRL+Shift+P` on a Windows machine) and select Gitpod: Open in VS Code.

![image](https://user-images.githubusercontent.com/1296324/202259556-5cec678d-a824-43f3-88ec-03e28c3fdef6.png)

Once the images are built and containers are started and the workspace is opened in VS Code Desktop, make sure that port 8080 is exposed publicly as well as forwarded, as well as port 4318 (where traces are published to):

![](images/expose-and-forward-ports-publicly.png)  

Now you can access:

Monitoring tools:
* Grafana (metrics): http://localhost:8080/grafana/
* Jaeger UI (traces and logs): http://localhost:8080/jaeger/ui/

Before accessing the webstore - there will probably not be many traces visible in Jaeger. Note that just by querying for traces in Jaeger, additional trace information is created (because Jaeger itself is also instrumented).
![](images/jaeger-query.png)  

Now access the Webstore Demo application: http://localhost:8080/ and perform some actions. Subsequently, check in Jaeger if you can find the traces for your actions - and whether the tags associated with those traces are available too. Note: they can even reveal the SQL statements executed against the PostgreSQL database. 

![](images/traces-after-some-clicking.png)  

Drill down on one specific trace reveals the spans under that trace:
![](images/spans-under-trace.png)  

Click the span to find the tags associated with the span:

![](images/tags-for-span-sql.png)  

You can take a look at the tab *Force Directed Graph* to see a visualization of the dependencies as derived from the trace details:
![](images/directed-graph.png)   

## Next Steps with OpenTelemetry Demo

Create additional load:
Load Generator UI: http://localhost:8080/loadgen/

Use these scenarios to explore:

https://github.com/open-telemetry/opentelemetry-demo/tree/main/docs#scenarios

Details about Instrumentation in specific technologies (such as Java, .NET, JavaScript (frontend and Node), Python and more):

https://github.com/open-telemetry/opentelemetry-demo/tree/main/docs#language-feature-reference 

The source code for this demo can be found in GitHub: [OpenTelemetry Demo - source code](https://github.com/open-telemetry/opentelemetry-demo/tree/main/src)

# Other explorations

The OpenTelemetry project provides many instructions/tutorials for instrumenting different types of applications. Applications can be made to publish traces, logs and metrics in an OpenTelemetry compliant fashion. This can be done from within the code - and sometimes simply by adding configuration to the project and the way the application is started (for example for Java and Node).

Some interesting tutorials:

* [Instrumenting a Browser - HTML/JS webapplication](https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/)
* [Instrumenting a NodeJS application](https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/)
* [Instrumenting a .NET application - get started](https://opentelemetry.io/docs/instrumentation/net/getting-started/)
* [Automatic Instrumentation of a Java application using a Java Agent](https://opentelemetry.io/docs/instrumentation/java/automatic/)

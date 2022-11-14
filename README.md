# gitpod-opentelemetry
A Gitpod workspace for exploring OpenTelemetry (and Signoz open source APM)


The instructions are based on this [OpenTelemetry Demo document](https://github.com/open-telemetry/opentelemetry-demo/blob/main/docs/docker_deployment.md)

Clone the Webstore Demo repository:
```
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

Navigate to the cloned folder:

```
cd opentelemetry-demo/
```

Run Docker Compose to start the demo:
```
docker compose up --no-build
```


## Open Gitpod Workspace in VS Code Desktop

The demo application can best be run locally - using port forwarding in for example VS Code - because it uses references to localhost for example  to publish metrics.  



Once the images are built and containers are started and the workspace is opened in VS Code Desktop you can access:

Webstore Demo application: http://localhost:8080/

Make sure that port 8080 is exposed publicly, as well as port 4318 (where traces are published to):


Create additional load:
Load Generator UI: http://localhost:8080/loadgen/


Monitoring tools:
Grafana: http://localhost:8080/grafana/
Jaeger UI: http://localhost:8080/jaeger/ui/



Click around in the webstore application 

Use these scenarios to explore:

https://github.com/open-telemetry/opentelemetry-demo/tree/main/docs#scenarios

Details about Instrumentation in specific technologies (such as Java, .NET, JavaScript (frontend and Node), Python and more):

https://github.com/open-telemetry/opentelemetry-demo/tree/main/docs#language-feature-reference 

The source code for this demo can be found in GitHub: [OpenTelemetry Demo - source code](https://github.com/open-telemetry/opentelemetry-demo/tree/main/src)


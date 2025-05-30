FROM openjdk:17-jdk-slim

WORKDIR /app

COPY .mvn .mvn/
COPY mvnw* pom.xml ./

RUN chmod +x ./mvnw

RUN ./mvnw clean install -DskipTests

COPY target/girerep-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
FROM public.ecr.aws/temurin/openjdk:17-jdk-focal AS builder
WORKDIR /app
COPY .mvn .mvn/
COPY mvnw* pom.xml ./
RUN chmod +x ./mvnw
RUN ./mvnw clean install -DskipTests

FROM public.ecr.aws/temurin/openjdk:17-jre-focal
WORKDIR /app
COPY --from=builder /app/target/girerep-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
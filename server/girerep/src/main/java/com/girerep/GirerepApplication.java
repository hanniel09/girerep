package com.girerep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.girerep")
@EnableJpaRepositories(basePackages = "com.girerep.repositories")
@EntityScan(basePackages = "com.girerep.domain")
public class GirerepApplication {

    public static void main(String[] args) {
        SpringApplication.run(GirerepApplication.class, args);
    }

}

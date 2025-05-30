package com.girerep.services.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public String generateToken(UserDetails user) {

        String authority = user.getAuthorities().iterator().next().getAuthority();
        String role = authority.replace("ROLE_", "");

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String extractUsername(String token) {
        return decodeToken(token).getSubject();
    }

    public boolean isValid(String token, UserDetails userDetails) {
        try{
            DecodedJWT decodedToken = decodeToken(token);
            return decodedToken.getSubject().equals(userDetails.getUsername()) &&
                    !decodedToken.getExpiresAt().before(new Date());
        } catch (JWTVerificationException e){
            return false;
        }
    }


    private DecodedJWT decodeToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        return verifier.verify(token);
    }
}

package com.girerep.repositories;

import com.girerep.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    @Query("""
                SELECT c FROM Client c 
                WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(c.buyer_name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(c.fantasy_name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(c.corporate_reason) LIKE LOWER(CONCAT('%', :query, '%'))
                ORDER BY
                    CASE 
                        WHEN LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) THEN 1
                        WHEN LOWER(c.buyer_name) LIKE LOWER(CONCAT('%', :query, '%')) THEN 2  
                        WHEN LOWER(c.fantasy_name) LIKE LOWER(CONCAT('%', :query, '%')) THEN 3 
                        WHEN LOWER(c.corporate_reason) LIKE LOWER(CONCAT('%', :query, '%')) THEN 4 
                        ELSE 5
                    END                                       
            """)
    List<Client> findByQuery(@Param("query") String query);
}

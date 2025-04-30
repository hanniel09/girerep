package com.girerep.controllers;

import com.girerep.domain.Client;
import com.girerep.domain.ClientCreateDTO;
import com.girerep.domain.ClientResponseDTO;
import com.girerep.domain.ClientUpdateDTO;
import com.girerep.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController()
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping()
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.findAllClients();
        return  ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable UUID id) {
        Client client = clientService.findClientById(id);
        return  ResponseEntity.ok(client);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClientResponseDTO>> searchClients(@RequestParam String query) {
        return ResponseEntity.ok(clientService.searchClients(query));
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody ClientCreateDTO clientCreateDTO) {
        Client client = clientService.createClient(clientCreateDTO);
        return  ResponseEntity.ok(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable UUID id, @RequestBody ClientUpdateDTO clientUpdateDTO) {
        Client client = clientService.updateClient(id, clientUpdateDTO);
        return  ResponseEntity.ok(client);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable UUID id) {
        clientService.deleteClient(id);
        return  ResponseEntity.noContent().build();
    }
}

package com.girerep.controllers.client;

import com.girerep.domain.client.Client;
import com.girerep.domain.client.ClientCreateDTO;
import com.girerep.domain.client.ClientResponseDTO;
import com.girerep.domain.client.ClientUpdateDTO;
import com.girerep.services.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<ClientResponseDTO>> getClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Client> clients = clientService.getAllClientsPaged(page, size);
        Page<ClientResponseDTO> dtoPage = clients.map(client ->
                new ClientResponseDTO(
                        client.getId(),
                        client.getName(),
                        client.getBuyer_name(),
                        client.getFantasy_name(),
                        client.getCorporate_reason(),
                        client.getEmail(),
                        client.getPhone(),
                        client.getAddress(),
                        client.getPostal_code()
                )
        );
        return ResponseEntity.ok(dtoPage);
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

package notes.app.backend.controller;

import notes.app.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import notes.app.backend.service.UserService;
import notes.app.backend.model.User;

@RestController
@RequestMapping("api/registration")
@RequiredArgsConstructor
@Controller
@CrossOrigin
public class UserController {
	
	@Autowired
	private final UserService userService;
	@Autowired
	private final UserRepository userRepository;


	@PostMapping
	public ResponseEntity<String> registerUser(@RequestBody @Valid User user){
		userService.registerUser(user);
		return ResponseEntity.ok("User registration successful! Please verify your email.");
	}



	@GetMapping("/check-verification")
	public ResponseEntity<Boolean> checkVerifiedEmail(String email){
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User Not Found"));
		return ResponseEntity.ok(user.getEnabled());
	}


}

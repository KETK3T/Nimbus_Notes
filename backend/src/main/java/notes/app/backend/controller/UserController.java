package notes.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import notes.app.backend.service.UserService;
import notes.app.backend.model.User;

@RestController
@RequestMapping("api/registration")
@RequiredArgsConstructor
public class UserController {
	
	@Autowired
	private final UserService userService;

	@PostMapping
	public ResponseEntity<String> registerUser(@RequestBody @Valid User user){
		userService.registerUser(user);
		return ResponseEntity.ok("User registration successful! Please verify your email.");
	}

	@GetMapping("/verify-email")
	public ResponseEntity<String> verifyEmail(@RequestParam String email){
		userService.verifyEmail(email);
		return ResponseEntity.ok("Email verified successfully");
	}
}

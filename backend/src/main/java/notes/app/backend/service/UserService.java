package notes.app.backend.service;

import notes.app.backend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import notes.app.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JavaMailSender mailSender;

	@Transactional
	public void registerUser(User user){
		System.out.println("Registering User: " + user);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		sendVerificationEmail(user);
	}

	private void sendVerificationEmail(User user){
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("jimi3rdacc@gmail.com");
		message.setTo(user.getEmail());
		message.setSubject("Email verification");
		message.setText("Click the link to verify your email: http://localhost:8080/api/registration/verify-email?email=" + user.getEmail());
		mailSender.send(message);
		System.out.println("Email sent :)");
	}

	public void verifyEmail(String email){
		User user = userRepository.findByEmail(email)
			.orElseThrow(() -> new RuntimeException("User Not Found"));
		user.setEnabled(true);
		userRepository.save(user);
	}

}

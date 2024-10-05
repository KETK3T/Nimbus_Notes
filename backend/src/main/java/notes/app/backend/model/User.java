
package notes.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Username is required")
	private String username;

	@Email(message = "Enter valid email")
	@NotBlank(message = "Email is required")
	private String email;

	@NotBlank(message = "password is required")
	private String password;

	@Builder.Default
	private Boolean enabled = false;
}

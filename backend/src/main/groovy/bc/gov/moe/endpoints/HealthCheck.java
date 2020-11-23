package bc.gov.moe.endpoints;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/health")
@CrossOrigin(origins = "*")
public class HealthCheck {

  @RequestMapping(value = {"/", ""}, method = RequestMethod.GET)
  public String healthCheck() {
    return "up";
  }
}

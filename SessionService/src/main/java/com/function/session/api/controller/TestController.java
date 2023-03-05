package com.function.session.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
public class TestController {
	@GetMapping("/hello")
	public String hello() {
		return "session";
	}
}

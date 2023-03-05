package com.function.sessionFunction.controller;

import java.sql.SQLOutput;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.function.sessionFunction.compileDto.CompileDto;
import com.function.sessionFunction.service.SessionFunctionServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/function")
@RequiredArgsConstructor
public class SessionController {

	private final SessionFunctionServiceImpl sessionFunctionService;

	@GetMapping("/hello")
	public String hello(){
		return "hello";
	}

	@PostMapping("/compile")
	public String CompileCode(@RequestBody CompileDto compileDto) {

		System.out.println(compileDto);
		System.out.println(sessionFunctionService);
		return sessionFunctionService.judge(compileDto);
	}

	@PostMapping("/test")
	public ResponseEntity<?> Test(@RequestBody CompileDto c){
		System.out.println("call post test");
		System.out.println(c.toString());
		return new ResponseEntity<CompileDto>(c, HttpStatus.OK);

	}


}

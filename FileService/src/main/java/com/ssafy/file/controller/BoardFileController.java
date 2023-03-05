package com.ssafy.file.controller;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.file.service.BoardFileService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/file/board")
@RequiredArgsConstructor
@RestController
public class BoardFileController {
	private final BoardFileService bFileService;


	@GetMapping("/hello")
	public String hello(){
		return "hello";
	}

	@PostMapping("/{id}")
	public String uploadFile(@RequestBody MultipartFile file,
		@PathVariable(value = "id") int id) {

		System.out.println("board : " + id);
		int res = bFileService.save(id,file);
		
		return res != -1 ? "성공"  : "파일의 크기는 10MB를 넘을 수 없습니다";
	}

	@GetMapping("/{id}")
	public Resource getFile(@PathVariable(value = "id") int id) {
		Resource res = bFileService.findByBoardId(id);
		return res;
	}

	// @PutMapping("{id}")
	// public String updateFile(@RequestBody MultipartFile file,
	// 	@PathVariable(value = "id") int id){
	// 	System.out.println("board : " + id);
	// 	bFileService.update(id);
	// 	int res = bFileService.save(id,file);
	//
	// 	return res != -1 ? "성공"  : "파일의 크기는 10MB를 넘을 수 없습니다";
	// }



}
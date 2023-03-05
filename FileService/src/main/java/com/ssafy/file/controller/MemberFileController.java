package com.ssafy.file.controller;

import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.file.service.BoardFileService;
import com.ssafy.file.service.MemberFileService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/file/Member")
@RequiredArgsConstructor
@RestController
public class MemberFileController {
	private final MemberFileService mFileService;

	@PostMapping("/{id}")
	public String uploadFile(@RequestBody MultipartFile file,
		@PathVariable(value = "id") int id) {

		System.out.println("member : " + id);
		int res = mFileService.save(id,file);
		
		return res != -1 ? "성공"  : "파일의 크기는 10MB를 넘을 수 없습니다";
	}

	@GetMapping("/{id}")
	public Resource getFile(@PathVariable(value = "id") int id) {

		Resource res = mFileService.findByBoardId(id);
		return res;
	}



}
package com.ssafy.file.service;

import java.io.File;
import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.file.data.BoardFile;
import com.ssafy.file.data.BoardFileRepository;
import com.ssafy.file.data.MemberFile;
import com.ssafy.file.data.MemberFileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberFileService {

	private final MemberFileRepository memberFileRepository;
	private final String path = "/app/data/memberItem";
	@Transactional
	public int save(int id, MultipartFile file) {

		MemberFile memberfile = new MemberFile(id,file.getOriginalFilename());
		int res = memberFileRepository.save(memberfile).getId();
		try {
			file.transferTo(new File(path+"/"+file.getOriginalFilename()));
		} catch (IOException e) {
			System.out.println(e);
			throw new RuntimeException(e);
		}
		return res;
	}

	@Transactional
	public Resource findByBoardId(int id) {
		MemberFile memberfile = memberFileRepository.findById(id);
		String name = memberfile.getName();
		Resource resource = new FileSystemResource(path+"/" + name);
		return resource;
	}
}

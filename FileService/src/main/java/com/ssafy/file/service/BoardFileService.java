package com.ssafy.file.service;

import java.io.File;
import java.io.IOException;

import javax.transaction.Transactional;

import org.eclipse.jdt.core.compiler.InvalidInputException;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.file.data.BoardFile;
import com.ssafy.file.data.BoardFileRepository;

import lombok.RequiredArgsConstructor;
import lombok.Value;

@Service
@RequiredArgsConstructor
public class BoardFileService {


	private final BoardFileRepository boardFileRepository;
	private final String path = "/app/data/boardItem";
	@Transactional
	public int save(int id, MultipartFile file) {

		BoardFile boardfile = new BoardFile(id,file.getOriginalFilename());
		int res = boardFileRepository.save(boardfile).getId();
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
		BoardFile boardfile = boardFileRepository.findById(id);
		if(boardfile == null)
			return null;
		String name = boardfile.getName();
		Resource resource = new FileSystemResource(path+"/" + name);
		return resource;
	}

	// @Transactional
	// public int update(int id, MultipartFile file) {
	// 	BoardFile boardfile = boardFileRepository.findById(id);
	// 	if(boardfile != null) {
	// 		String name = boardfile.getName();
	// 		File deleteFile = new File(path + "/" + name);
	// 		if (deleteFile.exists()) {
	// 			deleteFile.delete();
	// 		}
	// 		boardfile.update(file.getName());
	// 	}
	//
	// 	else{
	// 		int res = boardFileRepository.save(boardfile).getId();
	// 		try {
	// 			file.transferTo(new File(path+"/"+file.getOriginalFilename()));
	// 		} catch (IOException e) {
	// 			System.out.println(e);
	// 			throw new RuntimeException(e);
	// 		}
	// 	}
	//
	//
	// 	return;
	//
	// }
}

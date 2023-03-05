package com.ssafy.file.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardFileRepository extends JpaRepository<BoardFile, Integer>{

	BoardFile findById(int id);

}

package com.ssafy.file.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberFileRepository extends JpaRepository<MemberFile, Integer>{

	MemberFile findById(int id);

}

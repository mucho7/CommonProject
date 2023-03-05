package com.ssafy.coco.api.members.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Long countByEmail(String email);

	Long countByUserId(String userId);

	Optional<Member> findByUserId(String id);

	boolean existsByUserIdAndEmail(String userId, String email);

}

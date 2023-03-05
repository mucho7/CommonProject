package com.function.session.api.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.function.session.api.data.Room;

public class RoomSpecification {
	public static Specification<Room> equalMode(String mode) {
		return new Specification<Room>() {
			@Override
			public Predicate toPredicate(Root<Room> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.equal(root.get("mode"), mode);
			}
		};
	}

	public static Specification<Room> equalHostId(String hostId) {
		return new Specification<Room>() {
			@Override
			public Predicate toPredicate(Root<Room> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.equal(root.get("hostId"), hostId);
			}
		};
	}

	public static Specification<Room> likeTitle(String title) {
		return new Specification<Room>() {
			@Override
			public Predicate toPredicate(Root<Room> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.like(root.get("title"), "%" + title + "%");
			}
		};
	}
}

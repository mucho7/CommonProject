package com.function.board.domain.board;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.function.board.domain.BaseTimeEntity;
import com.function.board.domain.comment.Comment;
import com.function.board.dto.board.BoardUpdateRequestDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
@SQLDelete(sql = "UPDATE board SET is_deleted = true WHERE board_id=?")
@Where(clause = "is_deleted = false")
public class Board extends BaseTimeEntity {

	@JsonIgnore
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private final List<Comment> comments = new ArrayList<>();
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	private Long id;
	@Column(nullable = false)
	private String title;
	@Column(columnDefinition = "TEXT", nullable = false)
	private String content;
	@Column(name = "writer", nullable = false)
	private String writer;
	private int hit = 0;
	@Column(columnDefinition = "TEXT")
	private String code;

	@Builder
	public Board(String title, String content, String writer, int hit, String code) {
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.hit = hit;
		this.code = code;
	}

	public void update(BoardUpdateRequestDto requestDto) {
		this.title = requestDto.getTitle();
		this.content = requestDto.getContent();
		this.code = requestDto.getCode();

	}

}

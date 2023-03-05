package com.ssafy.file.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "member_file")
@NoArgsConstructor
public class MemberFile {

	@Id
	@Column(name="id")
	private int id;
	@Column(name = "filename")
	private String name;

	@Builder
	public MemberFile(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public void update(int id, String name) {
		this.id = id;
		this.name = name;
	}


}

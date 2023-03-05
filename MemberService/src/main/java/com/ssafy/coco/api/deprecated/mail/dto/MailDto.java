package com.ssafy.coco.api.deprecated.mail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailDto {
	private String address;
	private String title;
	private String message;
}

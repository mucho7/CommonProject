package com.function.sessionFunction.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

import org.springframework.stereotype.Service;

import com.function.sessionFunction.compileDto.CompileDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionFunctionServiceImpl {

	public String judge(CompileDto compileDto) {
		File inputFile = null;
		File codeFile = null;

		String code = ChangeClassName(compileDto);
		String input = compileDto.getInput();

		String filePath = "";
		String fileName = "Main"+compileDto.getId();
		try {
			// Write the code and input to files
			codeFile = new File(filePath+fileName+".java");
			FileWriter codeWriter = new FileWriter(codeFile);
			codeWriter.write(code);
			codeWriter.close();
			inputFile = new File(filePath+fileName+".txt");
			FileWriter inputWriter = new FileWriter(inputFile);
			inputWriter.write(input);
			inputWriter.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		ProcessBuilder builder = new ProcessBuilder("javac", filePath+fileName+".java");
		try {
			Process compileProcess = builder.start();
			compileProcess.waitFor();
			int compileResult = compileProcess.exitValue();
			if (compileResult != 0) {
				// Read the error stream of the process
				String errorMessage = new Scanner(compileProcess.getErrorStream()).useDelimiter("\\A").next();
				return "CE by compile: " + errorMessage;
			}
		} catch (IOException e) {
			return "CE by exception: " + e.getMessage();
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}

		builder = new ProcessBuilder("java", filePath+fileName);
		builder.redirectInput(inputFile);
		try {
			Process runProcess = builder.start();
			runProcess.waitFor();
			int runResult = runProcess.exitValue();
			if (runResult != 0) {
				// Read the error stream of the process
				String errorMessage = new Scanner(runProcess.getErrorStream()).useDelimiter("\\A").next();
				return "CE by run: " + errorMessage;
			} else {
				Scanner outputScanner = new Scanner(runProcess.getInputStream());
				StringBuilder outputBuilder = new StringBuilder();
				while (outputScanner.hasNextLine()) {
					outputBuilder.append(outputScanner.nextLine() + "\n");
				}
				String output = outputBuilder.toString();
				outputScanner.close();
				return output;
			}
		}
		catch (IOException | InterruptedException e) {
			return "CE By IO" + e;
		}
	}

	public String ChangeClassName(CompileDto compiledto) {

		String code = compiledto.getCode().replace("class Main","class Main"+ compiledto.getId());
		return code;
	}
}
